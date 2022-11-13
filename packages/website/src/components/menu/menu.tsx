import { component$ } from '@builder.io/qwik';
import { useContent, useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const { menu } = useContent();
  const { pathname } = useLocation();

  return (
    <div class="menu">
      {menu
        ? menu.items?.map((item) => (
            <>
              <h5>{item.text}</h5>
              <ul>
                {item.items?.map((item) => (
                  <li>
                    <a
                      href={item.href}
                      class={{
                        'is-active': pathname === item.href,
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ))
        : null}
    </div>
  );
});
