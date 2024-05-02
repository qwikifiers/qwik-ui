import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Breadcrumb, BreadcrumbItem } from '@qwik-ui/headless';
import BreadcrumbWrapper from './BreadcrumbWrapper';
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

      <Breadcrumb.Wrapper title="Breadcrumb Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index}>{itemBreadcrumb.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Breadcrumb.Wrapper>

      <Breadcrumb.Wrapper title="Breadcrumb with Icon Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index}>
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item">
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Breadcrumb.Wrapper>

      <Breadcrumb.Wrapper title="Breadcrumb with Active Example">
        <Breadcrumb>
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
        </Breadcrumb>
      </Breadcrumb.Wrapper>

      <Breadcrumb.Wrapper style={{ marginTop: '1rem' }}>
        <Breadcrumb>
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
        </Breadcrumb>
      </Breadcrumb.Wrapper>

      <Breadcrumb.Wrapper title="Breadcrumb with Custom Divider Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <Breadcrumb.Item key={index} divider="→">
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item--hovered">
                <span>{itemBreadcrumb.name}</span>
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Breadcrumb.Wrapper>
    </div>
  );
});
