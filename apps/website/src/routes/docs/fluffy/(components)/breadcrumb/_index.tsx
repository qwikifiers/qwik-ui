import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Breadcrumb, BreadcrumbItem } from '@qwik-ui/tailwind';
import BreadcrumbWrapper from './BreadcrumbWrapper';
import PathIcon from './PathIcon';

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
              <a
                href={`${itemBreadcrumb.path}`}
                class="inline-flex items-center hover:underline"
              >
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
              class={itemBreadcrumb.path === url.pathname ? 'text-primary' : ''}
            >
              {itemBreadcrumb.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>

      <BreadcrumbWrapper class="mt-4">
        <Breadcrumb>
          {breadcrumbPath.map((itemBreadcrumb, index) => (
            <BreadcrumbItem key={index}>
              <a
                href={`${itemBreadcrumb.path}`}
                class={`inline-flex items-center hover:underline ${
                  itemBreadcrumb.path === url.pathname ? 'text-primary' : ''
                }`}
              >
                <PathIcon />
                <span>{itemBreadcrumb.name}</span>
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </BreadcrumbWrapper>
    </div>
  );
});
