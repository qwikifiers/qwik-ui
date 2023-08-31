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

      <BreadcrumbWrapper title="Breadcrumb Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem key={index}>{itemBreadcrumb.name}</BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>

      <BreadcrumbWrapper title="Breadcrumb with Icon Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem key={index}>
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item">
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>

      <BreadcrumbWrapper title="Breadcrumb with Active Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem
              key={index}
              class={
                itemBreadcrumb.path === url.pathname ? 'breadcrumb-item--active' : ''
              }
            >
              {itemBreadcrumb.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>

      <BreadcrumbWrapper style={{ marginTop: '1rem' }}>
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem key={index}>
              <a
                href={`${itemBreadcrumb.path}`}
                class={`breadcrumb-item ${
                  itemBreadcrumb.path === url.pathname ? 'breadcrumb-item--active' : ''
                }`}
              >
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>

      <BreadcrumbWrapper title="Breadcrumb with Custom Divider Example">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem key={index} divider="→">
              <a href={`${itemBreadcrumb.path}`} class="breadcrumb-item--hovered">
                <span>{itemBreadcrumb.name}</span>
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>
    </div>
  );
});
