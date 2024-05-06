import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Breadcrumb } from '@qwik-ui/headless';
import { BreadcrumWrapper } from './BreadcrumbWrapper';
import PathIcon from './PathIcon';
import style from './index.css?inline';

interface BreadcrumbPath {
  name: string;
  path: string;
}

export default component$(() => {
  const { url } = useLocation();

  const breadcrumbPath: BreadcrumbPath[] = url.pathname
    .split('/')
    .filter((path) => path)
    .map((path, indexPath, arrPath) => {
      return {
        name: path,
        path:
          indexPath > 0
            ? `/${arrPath.filter((_, indexPath2) => indexPath2 < indexPath).join('/')}/${
                arrPath[indexPath]
              }/`
            : `/${path}/`,
      };
    });

  useStylesScoped$(style);

  return (
    <div>
      <h2>This is the documentation for the Breadcrumb</h2>

      <BreadcrumWrapper title="Breadcrumb Example">
        <Breadcrumb.Root>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index}>{itemBreadcrumb.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb.Root>
      </BreadcrumWrapper>

      <BreadcrumWrapper title="Breadcrumb with Icon Example">
        <Breadcrumb.Root>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index}>
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item">
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb.Root>
      </BreadcrumWrapper>

      <BreadcrumWrapper title="Breadcrumb with Active Example">
        <Breadcrumb.Root>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item
              key={index}
              class={
                itemBreadcrumb.path === url.pathname ? 'breadcrumb-item--active' : ''
              }
            >
              {itemBreadcrumb.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb.Root>
      </BreadcrumWrapper>

      <BreadcrumWrapper style={{ marginTop: '1rem' }}>
        <Breadcrumb.Root>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index}>
              <a
                href={`${itemBreadcrumb.path}`}
                class={`breadcrumb-item ${
                  itemBreadcrumb.path === url.pathname ? 'breadcrumb-item--active' : ''
                }`}
              >
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb.Root>
      </BreadcrumWrapper>

      <BreadcrumWrapper title="Breadcrumb with Custom Divider Example">
        <Breadcrumb.Root>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index} divider="→">
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item--hovered">
                <span>{itemBreadcrumb.name}</span>
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb.Root>
      </BreadcrumWrapper>
    </div>
  );
});
