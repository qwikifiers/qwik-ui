'use strict';
var sv = Object.create;
var $i = Object.defineProperty;
var ov = Object.getOwnPropertyDescriptor;
var av = Object.getOwnPropertyNames;
var cv = Object.getPrototypeOf,
  uv = Object.prototype.hasOwnProperty;
var q = (t, e) => () => (t && (e = t((t = 0))), e);
var E = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  Nt = (t, e) => {
    for (var r in e) $i(t, r, { get: e[r], enumerable: !0 });
  },
  Xf = (t, e, r, n) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let i of av(e))
        !uv.call(t, i) &&
          i !== r &&
          $i(t, i, { get: () => e[i], enumerable: !(n = ov(e, i)) || n.enumerable });
    return t;
  };
var br = (t, e, r) => (
    (r = t != null ? sv(cv(t)) : {}),
    Xf(e || !t || !t.__esModule ? $i(r, 'default', { value: t, enumerable: !0 }) : r, t)
  ),
  be = (t) => Xf($i({}, '__esModule', { value: !0 }), t);
function Kf() {
  return (
    process.env.CI === 'true' ||
    process.env.TF_BUILD === 'true' ||
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.BUILDKITE === 'true' ||
    process.env.CIRCLECI === 'true' ||
    process.env.CIRRUS_CI === 'true' ||
    process.env.TRAVIS === 'true' ||
    !!process.env['bamboo.buildKey'] ||
    !!process.env.CODEBUILD_BUILD_ID ||
    !!process.env.GITLAB_CI ||
    !!process.env.HEROKU_TEST_RUN_ID ||
    !!process.env.BUILD_ID ||
    !!process.env.BUILD_BUILDID ||
    !!process.env.TEAMCITY_VERSION
  );
}
var Yf = q(() => {
  'use strict';
});
var eh = E((NN, ca) => {
  'use strict';
  var lv = require('fs'),
    Jf = require('path'),
    fv = require('os');
  function Zf(t) {
    console.log(`[dotenv][DEBUG] ${t}`);
  }
  var hv = `
`,
    dv = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    pv = /\\n/g,
    mv = /\r\n|\n|\r/;
  function Qf(t, e) {
    let r = !!(e && e.debug),
      n = {};
    return (
      t
        .toString()
        .split(mv)
        .forEach(function (i, s) {
          let o = i.match(dv);
          if (o != null) {
            let a = o[1],
              c = o[2] || '',
              l = c.length - 1,
              u = c[0] === '"' && c[l] === '"';
            (c[0] === "'" && c[l] === "'") || u
              ? ((c = c.substring(1, l)), u && (c = c.replace(pv, hv)))
              : (c = c.trim()),
              (n[a] = c);
          } else r && Zf(`did not match key and value when parsing line ${s + 1}: ${i}`);
        }),
      n
    );
  }
  function yv(t) {
    return t[0] === '~' ? Jf.join(fv.homedir(), t.slice(1)) : t;
  }
  function Ev(t) {
    let e = Jf.resolve(process.cwd(), '.env'),
      r = 'utf8',
      n = !1;
    t &&
      (t.path != null && (e = yv(t.path)),
      t.encoding != null && (r = t.encoding),
      t.debug != null && (n = !0));
    try {
      let i = Qf(lv.readFileSync(e, { encoding: r }), { debug: n });
      return (
        Object.keys(i).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? n &&
              Zf(
                `"${s}" is already defined in \`process.env\` and will not be overwritten`,
              )
            : (process.env[s] = i[s]);
        }),
        { parsed: i }
      );
    } catch (i) {
      return { error: i };
    }
  }
  ca.exports.config = Ev;
  ca.exports.parse = Qf;
});
var th = E((Wn, ua) => {
  'use strict';
  (function (t, e) {
    typeof Wn == 'object' && typeof ua == 'object'
      ? (ua.exports = e(require('child_process'), require('crypto')))
      : typeof define == 'function' && define.amd
      ? define(['child_process', 'crypto'], e)
      : typeof Wn == 'object'
      ? (Wn['electron-machine-id'] = e(require('child_process'), require('crypto')))
      : (t['electron-machine-id'] = e(t.child_process, t.crypto));
  })(Wn, function (t, e) {
    return (function (r) {
      function n(s) {
        if (i[s]) return i[s].exports;
        var o = (i[s] = { exports: {}, id: s, loaded: !1 });
        return r[s].call(o.exports, o, o.exports, n), (o.loaded = !0), o.exports;
      }
      var i = {};
      return (n.m = r), (n.c = i), (n.p = ''), n(0);
    })([
      function (r, n, i) {
        r.exports = i(34);
      },
      function (r, n, i) {
        var s = i(29)('wks'),
          o = i(33),
          a = i(2).Symbol,
          c = typeof a == 'function',
          l = (r.exports = function (u) {
            return s[u] || (s[u] = (c && a[u]) || (c ? a : o)('Symbol.' + u));
          });
        l.store = s;
      },
      function (r, n) {
        var i = (r.exports =
          typeof window < 'u' && window.Math == Math
            ? window
            : typeof self < 'u' && self.Math == Math
            ? self
            : Function('return this')());
        typeof __g == 'number' && (__g = i);
      },
      function (r, n, i) {
        var s = i(9);
        r.exports = function (o) {
          if (!s(o)) throw TypeError(o + ' is not an object!');
          return o;
        };
      },
      function (r, n, i) {
        r.exports = !i(24)(function () {
          return (
            Object.defineProperty({}, 'a', {
              get: function () {
                return 7;
              },
            }).a != 7
          );
        });
      },
      function (r, n, i) {
        var s = i(12),
          o = i(17);
        r.exports = i(4)
          ? function (a, c, l) {
              return s.f(a, c, o(1, l));
            }
          : function (a, c, l) {
              return (a[c] = l), a;
            };
      },
      function (r, n) {
        var i = (r.exports = { version: '2.4.0' });
        typeof __e == 'number' && (__e = i);
      },
      function (r, n, i) {
        var s = i(14);
        r.exports = function (o, a, c) {
          if ((s(o), a === void 0)) return o;
          switch (c) {
            case 1:
              return function (l) {
                return o.call(a, l);
              };
            case 2:
              return function (l, u) {
                return o.call(a, l, u);
              };
            case 3:
              return function (l, u, f) {
                return o.call(a, l, u, f);
              };
          }
          return function () {
            return o.apply(a, arguments);
          };
        };
      },
      function (r, n) {
        var i = {}.hasOwnProperty;
        r.exports = function (s, o) {
          return i.call(s, o);
        };
      },
      function (r, n) {
        r.exports = function (i) {
          return typeof i == 'object' ? i !== null : typeof i == 'function';
        };
      },
      function (r, n) {
        r.exports = {};
      },
      function (r, n) {
        var i = {}.toString;
        r.exports = function (s) {
          return i.call(s).slice(8, -1);
        };
      },
      function (r, n, i) {
        var s = i(3),
          o = i(26),
          a = i(32),
          c = Object.defineProperty;
        n.f = i(4)
          ? Object.defineProperty
          : function (l, u, f) {
              if ((s(l), (u = a(u, !0)), s(f), o))
                try {
                  return c(l, u, f);
                } catch {}
              if ('get' in f || 'set' in f) throw TypeError('Accessors not supported!');
              return 'value' in f && (l[u] = f.value), l;
            };
      },
      function (r, n, i) {
        var s = i(42),
          o = i(15);
        r.exports = function (a) {
          return s(o(a));
        };
      },
      function (r, n) {
        r.exports = function (i) {
          if (typeof i != 'function') throw TypeError(i + ' is not a function!');
          return i;
        };
      },
      function (r, n) {
        r.exports = function (i) {
          if (i == null) throw TypeError("Can't call method on  " + i);
          return i;
        };
      },
      function (r, n, i) {
        var s = i(9),
          o = i(2).document,
          a = s(o) && s(o.createElement);
        r.exports = function (c) {
          return a ? o.createElement(c) : {};
        };
      },
      function (r, n) {
        r.exports = function (i, s) {
          return {
            enumerable: !(1 & i),
            configurable: !(2 & i),
            writable: !(4 & i),
            value: s,
          };
        };
      },
      function (r, n, i) {
        var s = i(12).f,
          o = i(8),
          a = i(1)('toStringTag');
        r.exports = function (c, l, u) {
          c &&
            !o((c = u ? c : c.prototype), a) &&
            s(c, a, { configurable: !0, value: l });
        };
      },
      function (r, n, i) {
        var s = i(29)('keys'),
          o = i(33);
        r.exports = function (a) {
          return s[a] || (s[a] = o(a));
        };
      },
      function (r, n) {
        var i = Math.ceil,
          s = Math.floor;
        r.exports = function (o) {
          return isNaN((o = +o)) ? 0 : (o > 0 ? s : i)(o);
        };
      },
      function (r, n, i) {
        var s = i(11),
          o = i(1)('toStringTag'),
          a =
            s(
              (function () {
                return arguments;
              })(),
            ) == 'Arguments',
          c = function (l, u) {
            try {
              return l[u];
            } catch {}
          };
        r.exports = function (l) {
          var u, f, h;
          return l === void 0
            ? 'Undefined'
            : l === null
            ? 'Null'
            : typeof (f = c((u = Object(l)), o)) == 'string'
            ? f
            : a
            ? s(u)
            : (h = s(u)) == 'Object' && typeof u.callee == 'function'
            ? 'Arguments'
            : h;
        };
      },
      function (r, n) {
        r.exports =
          'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
            ',',
          );
      },
      function (r, n, i) {
        var s = i(2),
          o = i(6),
          a = i(7),
          c = i(5),
          l = 'prototype',
          u = function (f, h, d) {
            var p,
              v,
              m,
              w = f & u.F,
              L = f & u.G,
              O = f & u.S,
              N = f & u.P,
              P = f & u.B,
              I = f & u.W,
              z = L ? o : o[h] || (o[h] = {}),
              G = z[l],
              T = L ? s : O ? s[h] : (s[h] || {})[l];
            L && (d = h);
            for (p in d)
              (v = !w && T && T[p] !== void 0),
                (v && p in z) ||
                  ((m = v ? T[p] : d[p]),
                  (z[p] =
                    L && typeof T[p] != 'function'
                      ? d[p]
                      : P && v
                      ? a(m, s)
                      : I && T[p] == m
                      ? (function (C) {
                          var j = function (X, V, J) {
                            if (this instanceof C) {
                              switch (arguments.length) {
                                case 0:
                                  return new C();
                                case 1:
                                  return new C(X);
                                case 2:
                                  return new C(X, V);
                              }
                              return new C(X, V, J);
                            }
                            return C.apply(this, arguments);
                          };
                          return (j[l] = C[l]), j;
                        })(m)
                      : N && typeof m == 'function'
                      ? a(Function.call, m)
                      : m),
                  N &&
                    (((z.virtual || (z.virtual = {}))[p] = m),
                    f & u.R && G && !G[p] && c(G, p, m)));
          };
        (u.F = 1),
          (u.G = 2),
          (u.S = 4),
          (u.P = 8),
          (u.B = 16),
          (u.W = 32),
          (u.U = 64),
          (u.R = 128),
          (r.exports = u);
      },
      function (r, n) {
        r.exports = function (i) {
          try {
            return !!i();
          } catch {
            return !0;
          }
        };
      },
      function (r, n, i) {
        r.exports = i(2).document && document.documentElement;
      },
      function (r, n, i) {
        r.exports =
          !i(4) &&
          !i(24)(function () {
            return (
              Object.defineProperty(i(16)('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      function (r, n, i) {
        'use strict';
        var s = i(28),
          o = i(23),
          a = i(57),
          c = i(5),
          l = i(8),
          u = i(10),
          f = i(45),
          h = i(18),
          d = i(52),
          p = i(1)('iterator'),
          v = !([].keys && 'next' in [].keys()),
          m = '@@iterator',
          w = 'keys',
          L = 'values',
          O = function () {
            return this;
          };
        r.exports = function (N, P, I, z, G, T, C) {
          f(I, P, z);
          var j,
            X,
            V,
            J = function (A) {
              if (!v && A in k) return k[A];
              switch (A) {
                case w:
                  return function () {
                    return new I(this, A);
                  };
                case L:
                  return function () {
                    return new I(this, A);
                  };
              }
              return function () {
                return new I(this, A);
              };
            },
            B = P + ' Iterator',
            K = G == L,
            $ = !1,
            k = N.prototype,
            H = k[p] || k[m] || (G && k[G]),
            le = H || J(G),
            Re = G ? (K ? J('entries') : le) : void 0,
            R = (P == 'Array' && k.entries) || H;
          if (
            (R &&
              ((V = d(R.call(new N()))),
              V !== Object.prototype && (h(V, B, !0), s || l(V, p) || c(V, p, O))),
            K &&
              H &&
              H.name !== L &&
              (($ = !0),
              (le = function () {
                return H.call(this);
              })),
            (s && !C) || (!v && !$ && k[p]) || c(k, p, le),
            (u[P] = le),
            (u[B] = O),
            G)
          )
            if (((j = { values: K ? le : J(L), keys: T ? le : J(w), entries: Re }), C))
              for (X in j) X in k || a(k, X, j[X]);
            else o(o.P + o.F * (v || $), P, j);
          return j;
        };
      },
      function (r, n) {
        r.exports = !0;
      },
      function (r, n, i) {
        var s = i(2),
          o = '__core-js_shared__',
          a = s[o] || (s[o] = {});
        r.exports = function (c) {
          return a[c] || (a[c] = {});
        };
      },
      function (r, n, i) {
        var s,
          o,
          a,
          c = i(7),
          l = i(41),
          u = i(25),
          f = i(16),
          h = i(2),
          d = h.process,
          p = h.setImmediate,
          v = h.clearImmediate,
          m = h.MessageChannel,
          w = 0,
          L = {},
          O = 'onreadystatechange',
          N = function () {
            var I = +this;
            if (L.hasOwnProperty(I)) {
              var z = L[I];
              delete L[I], z();
            }
          },
          P = function (I) {
            N.call(I.data);
          };
        (p && v) ||
          ((p = function (I) {
            for (var z = [], G = 1; arguments.length > G; ) z.push(arguments[G++]);
            return (
              (L[++w] = function () {
                l(typeof I == 'function' ? I : Function(I), z);
              }),
              s(w),
              w
            );
          }),
          (v = function (I) {
            delete L[I];
          }),
          i(11)(d) == 'process'
            ? (s = function (I) {
                d.nextTick(c(N, I, 1));
              })
            : m
            ? ((o = new m()),
              (a = o.port2),
              (o.port1.onmessage = P),
              (s = c(a.postMessage, a, 1)))
            : h.addEventListener && typeof postMessage == 'function' && !h.importScripts
            ? ((s = function (I) {
                h.postMessage(I + '', '*');
              }),
              h.addEventListener('message', P, !1))
            : (s =
                O in f('script')
                  ? function (I) {
                      u.appendChild(f('script'))[O] = function () {
                        u.removeChild(this), N.call(I);
                      };
                    }
                  : function (I) {
                      setTimeout(c(N, I, 1), 0);
                    })),
          (r.exports = { set: p, clear: v });
      },
      function (r, n, i) {
        var s = i(20),
          o = Math.min;
        r.exports = function (a) {
          return a > 0 ? o(s(a), 9007199254740991) : 0;
        };
      },
      function (r, n, i) {
        var s = i(9);
        r.exports = function (o, a) {
          if (!s(o)) return o;
          var c, l;
          if (
            (a && typeof (c = o.toString) == 'function' && !s((l = c.call(o)))) ||
            (typeof (c = o.valueOf) == 'function' && !s((l = c.call(o)))) ||
            (!a && typeof (c = o.toString) == 'function' && !s((l = c.call(o))))
          )
            return l;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      function (r, n) {
        var i = 0,
          s = Math.random();
        r.exports = function (o) {
          return 'Symbol('.concat(o === void 0 ? '' : o, ')_', (++i + s).toString(36));
        };
      },
      function (r, n, i) {
        'use strict';
        function s(O) {
          return O && O.__esModule ? O : { default: O };
        }
        function o() {
          return process.platform !== 'win32'
            ? ''
            : process.arch === 'ia32' &&
              process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
            ? 'mixed'
            : 'native';
        }
        function a(O) {
          return (0, p.createHash)('sha256').update(O).digest('hex');
        }
        function c(O) {
          switch (m) {
            case 'darwin':
              return O.split('IOPlatformUUID')[1]
                .split(
                  `
`,
                )[0]
                .replace(/\=|\s+|\"/gi, '')
                .toLowerCase();
            case 'win32':
              return O.toString()
                .split('REG_SZ')[1]
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'linux':
              return O.toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'freebsd':
              return O.toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            default:
              throw new Error('Unsupported platform: ' + process.platform);
          }
        }
        function l(O) {
          var N = c((0, d.execSync)(L[m]).toString());
          return O ? N : a(N);
        }
        function u(O) {
          return new h.default(function (N, P) {
            return (0, d.exec)(L[m], {}, function (I, z, G) {
              if (I) return P(new Error('Error while obtaining machine id: ' + I.stack));
              var T = c(z.toString());
              return N(O ? T : a(T));
            });
          });
        }
        Object.defineProperty(n, '__esModule', { value: !0 });
        var f = i(35),
          h = s(f);
        (n.machineIdSync = l), (n.machineId = u);
        var d = i(70),
          p = i(71),
          v = process,
          m = v.platform,
          w = {
            native: '%windir%\\System32',
            mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32',
          },
          L = {
            darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
            win32:
              w[o()] +
              '\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid',
            linux:
              '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
            freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid',
          };
      },
      function (r, n, i) {
        r.exports = { default: i(36), __esModule: !0 };
      },
      function (r, n, i) {
        i(66), i(68), i(69), i(67), (r.exports = i(6).Promise);
      },
      function (r, n) {
        r.exports = function () {};
      },
      function (r, n) {
        r.exports = function (i, s, o, a) {
          if (!(i instanceof s) || (a !== void 0 && a in i))
            throw TypeError(o + ': incorrect invocation!');
          return i;
        };
      },
      function (r, n, i) {
        var s = i(13),
          o = i(31),
          a = i(62);
        r.exports = function (c) {
          return function (l, u, f) {
            var h,
              d = s(l),
              p = o(d.length),
              v = a(f, p);
            if (c && u != u) {
              for (; p > v; ) if (((h = d[v++]), h != h)) return !0;
            } else for (; p > v; v++) if ((c || v in d) && d[v] === u) return c || v || 0;
            return !c && -1;
          };
        };
      },
      function (r, d, i) {
        var s = i(7),
          o = i(44),
          a = i(43),
          c = i(3),
          l = i(31),
          u = i(64),
          f = {},
          h = {},
          d = (r.exports = function (p, v, m, w, L) {
            var O,
              N,
              P,
              I,
              z = L
                ? function () {
                    return p;
                  }
                : u(p),
              G = s(m, w, v ? 2 : 1),
              T = 0;
            if (typeof z != 'function') throw TypeError(p + ' is not iterable!');
            if (a(z)) {
              for (O = l(p.length); O > T; T++)
                if (((I = v ? G(c((N = p[T]))[0], N[1]) : G(p[T])), I === f || I === h))
                  return I;
            } else
              for (P = z.call(p); !(N = P.next()).done; )
                if (((I = o(P, G, N.value, v)), I === f || I === h)) return I;
          });
        (d.BREAK = f), (d.RETURN = h);
      },
      function (r, n) {
        r.exports = function (i, s, o) {
          var a = o === void 0;
          switch (s.length) {
            case 0:
              return a ? i() : i.call(o);
            case 1:
              return a ? i(s[0]) : i.call(o, s[0]);
            case 2:
              return a ? i(s[0], s[1]) : i.call(o, s[0], s[1]);
            case 3:
              return a ? i(s[0], s[1], s[2]) : i.call(o, s[0], s[1], s[2]);
            case 4:
              return a ? i(s[0], s[1], s[2], s[3]) : i.call(o, s[0], s[1], s[2], s[3]);
          }
          return i.apply(o, s);
        };
      },
      function (r, n, i) {
        var s = i(11);
        r.exports = Object('z').propertyIsEnumerable(0)
          ? Object
          : function (o) {
              return s(o) == 'String' ? o.split('') : Object(o);
            };
      },
      function (r, n, i) {
        var s = i(10),
          o = i(1)('iterator'),
          a = Array.prototype;
        r.exports = function (c) {
          return c !== void 0 && (s.Array === c || a[o] === c);
        };
      },
      function (r, n, i) {
        var s = i(3);
        r.exports = function (o, a, c, l) {
          try {
            return l ? a(s(c)[0], c[1]) : a(c);
          } catch (f) {
            var u = o.return;
            throw (u !== void 0 && s(u.call(o)), f);
          }
        };
      },
      function (r, n, i) {
        'use strict';
        var s = i(49),
          o = i(17),
          a = i(18),
          c = {};
        i(5)(c, i(1)('iterator'), function () {
          return this;
        }),
          (r.exports = function (l, u, f) {
            (l.prototype = s(c, { next: o(1, f) })), a(l, u + ' Iterator');
          });
      },
      function (r, n, i) {
        var s = i(1)('iterator'),
          o = !1;
        try {
          var a = [7][s]();
          (a.return = function () {
            o = !0;
          }),
            Array.from(a, function () {
              throw 2;
            });
        } catch {}
        r.exports = function (c, l) {
          if (!l && !o) return !1;
          var u = !1;
          try {
            var f = [7],
              h = f[s]();
            (h.next = function () {
              return { done: (u = !0) };
            }),
              (f[s] = function () {
                return h;
              }),
              c(f);
          } catch {}
          return u;
        };
      },
      function (r, n) {
        r.exports = function (i, s) {
          return { value: s, done: !!i };
        };
      },
      function (r, n, i) {
        var s = i(2),
          o = i(30).set,
          a = s.MutationObserver || s.WebKitMutationObserver,
          c = s.process,
          l = s.Promise,
          u = i(11)(c) == 'process';
        r.exports = function () {
          var f,
            h,
            d,
            p = function () {
              var L, O;
              for (u && (L = c.domain) && L.exit(); f; ) {
                (O = f.fn), (f = f.next);
                try {
                  O();
                } catch (N) {
                  throw (f ? d() : (h = void 0), N);
                }
              }
              (h = void 0), L && L.enter();
            };
          if (u)
            d = function () {
              c.nextTick(p);
            };
          else if (a) {
            var v = !0,
              m = document.createTextNode('');
            new a(p).observe(m, { characterData: !0 }),
              (d = function () {
                m.data = v = !v;
              });
          } else if (l && l.resolve) {
            var w = l.resolve();
            d = function () {
              w.then(p);
            };
          } else
            d = function () {
              o.call(s, p);
            };
          return function (L) {
            var O = { fn: L, next: void 0 };
            h && (h.next = O), f || ((f = O), d()), (h = O);
          };
        };
      },
      function (r, n, i) {
        var s = i(3),
          o = i(50),
          a = i(22),
          c = i(19)('IE_PROTO'),
          l = function () {},
          u = 'prototype',
          f = function () {
            var h,
              d = i(16)('iframe'),
              p = a.length,
              v = '>';
            for (
              d.style.display = 'none',
                i(25).appendChild(d),
                d.src = 'javascript:',
                h = d.contentWindow.document,
                h.open(),
                h.write('<script>document.F=Object</script' + v),
                h.close(),
                f = h.F;
              p--;

            )
              delete f[u][a[p]];
            return f();
          };
        r.exports =
          Object.create ||
          function (h, d) {
            var p;
            return (
              h !== null
                ? ((l[u] = s(h)), (p = new l()), (l[u] = null), (p[c] = h))
                : (p = f()),
              d === void 0 ? p : o(p, d)
            );
          };
      },
      function (r, n, i) {
        var s = i(12),
          o = i(3),
          a = i(54);
        r.exports = i(4)
          ? Object.defineProperties
          : function (c, l) {
              o(c);
              for (var u, f = a(l), h = f.length, d = 0; h > d; )
                s.f(c, (u = f[d++]), l[u]);
              return c;
            };
      },
      function (r, n, i) {
        var s = i(55),
          o = i(17),
          a = i(13),
          c = i(32),
          l = i(8),
          u = i(26),
          f = Object.getOwnPropertyDescriptor;
        n.f = i(4)
          ? f
          : function (h, d) {
              if (((h = a(h)), (d = c(d, !0)), u))
                try {
                  return f(h, d);
                } catch {}
              if (l(h, d)) return o(!s.f.call(h, d), h[d]);
            };
      },
      function (r, n, i) {
        var s = i(8),
          o = i(63),
          a = i(19)('IE_PROTO'),
          c = Object.prototype;
        r.exports =
          Object.getPrototypeOf ||
          function (l) {
            return (
              (l = o(l)),
              s(l, a)
                ? l[a]
                : typeof l.constructor == 'function' && l instanceof l.constructor
                ? l.constructor.prototype
                : l instanceof Object
                ? c
                : null
            );
          };
      },
      function (r, n, i) {
        var s = i(8),
          o = i(13),
          a = i(39)(!1),
          c = i(19)('IE_PROTO');
        r.exports = function (l, u) {
          var f,
            h = o(l),
            d = 0,
            p = [];
          for (f in h) f != c && s(h, f) && p.push(f);
          for (; u.length > d; ) s(h, (f = u[d++])) && (~a(p, f) || p.push(f));
          return p;
        };
      },
      function (r, n, i) {
        var s = i(53),
          o = i(22);
        r.exports =
          Object.keys ||
          function (a) {
            return s(a, o);
          };
      },
      function (r, n) {
        n.f = {}.propertyIsEnumerable;
      },
      function (r, n, i) {
        var s = i(5);
        r.exports = function (o, a, c) {
          for (var l in a) c && o[l] ? (o[l] = a[l]) : s(o, l, a[l]);
          return o;
        };
      },
      function (r, n, i) {
        r.exports = i(5);
      },
      function (r, n, i) {
        var s = i(9),
          o = i(3),
          a = function (c, l) {
            if ((o(c), !s(l) && l !== null))
              throw TypeError(l + ": can't set as prototype!");
          };
        r.exports = {
          set:
            Object.setPrototypeOf ||
            ('__proto__' in {}
              ? (function (c, l, u) {
                  try {
                    (u = i(7)(
                      Function.call,
                      i(51).f(Object.prototype, '__proto__').set,
                      2,
                    )),
                      u(c, []),
                      (l = !(c instanceof Array));
                  } catch {
                    l = !0;
                  }
                  return function (f, h) {
                    return a(f, h), l ? (f.__proto__ = h) : u(f, h), f;
                  };
                })({}, !1)
              : void 0),
          check: a,
        };
      },
      function (r, n, i) {
        'use strict';
        var s = i(2),
          o = i(6),
          a = i(12),
          c = i(4),
          l = i(1)('species');
        r.exports = function (u) {
          var f = typeof o[u] == 'function' ? o[u] : s[u];
          c &&
            f &&
            !f[l] &&
            a.f(f, l, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      function (r, n, i) {
        var s = i(3),
          o = i(14),
          a = i(1)('species');
        r.exports = function (c, l) {
          var u,
            f = s(c).constructor;
          return f === void 0 || (u = s(f)[a]) == null ? l : o(u);
        };
      },
      function (r, n, i) {
        var s = i(20),
          o = i(15);
        r.exports = function (a) {
          return function (c, l) {
            var u,
              f,
              h = String(o(c)),
              d = s(l),
              p = h.length;
            return d < 0 || d >= p
              ? a
                ? ''
                : void 0
              : ((u = h.charCodeAt(d)),
                u < 55296 ||
                u > 56319 ||
                d + 1 === p ||
                (f = h.charCodeAt(d + 1)) < 56320 ||
                f > 57343
                  ? a
                    ? h.charAt(d)
                    : u
                  : a
                  ? h.slice(d, d + 2)
                  : ((u - 55296) << 10) + (f - 56320) + 65536);
          };
        };
      },
      function (r, n, i) {
        var s = i(20),
          o = Math.max,
          a = Math.min;
        r.exports = function (c, l) {
          return (c = s(c)), c < 0 ? o(c + l, 0) : a(c, l);
        };
      },
      function (r, n, i) {
        var s = i(15);
        r.exports = function (o) {
          return Object(s(o));
        };
      },
      function (r, n, i) {
        var s = i(21),
          o = i(1)('iterator'),
          a = i(10);
        r.exports = i(6).getIteratorMethod = function (c) {
          if (c != null) return c[o] || c['@@iterator'] || a[s(c)];
        };
      },
      function (r, n, i) {
        'use strict';
        var s = i(37),
          o = i(47),
          a = i(10),
          c = i(13);
        (r.exports = i(27)(
          Array,
          'Array',
          function (l, u) {
            (this._t = c(l)), (this._i = 0), (this._k = u);
          },
          function () {
            var l = this._t,
              u = this._k,
              f = this._i++;
            return !l || f >= l.length
              ? ((this._t = void 0), o(1))
              : u == 'keys'
              ? o(0, f)
              : u == 'values'
              ? o(0, l[f])
              : o(0, [f, l[f]]);
          },
          'values',
        )),
          (a.Arguments = a.Array),
          s('keys'),
          s('values'),
          s('entries');
      },
      function (r, n) {},
      function (r, n, i) {
        'use strict';
        var s,
          o,
          a,
          c = i(28),
          l = i(2),
          u = i(7),
          f = i(21),
          h = i(23),
          d = i(9),
          p = (i(3), i(14)),
          v = i(38),
          m = i(40),
          w = (i(58).set, i(60)),
          L = i(30).set,
          O = i(48)(),
          N = 'Promise',
          P = l.TypeError,
          z = l.process,
          I = l[N],
          z = l.process,
          G = f(z) == 'process',
          T = function () {},
          C = !!(function () {
            try {
              var R = I.resolve(1),
                A = ((R.constructor = {})[i(1)('species')] = function (S) {
                  S(T, T);
                });
              return (
                (G || typeof PromiseRejectionEvent == 'function') &&
                R.then(T) instanceof A
              );
            } catch {}
          })(),
          j = function (R, A) {
            return R === A || (R === I && A === a);
          },
          X = function (R) {
            var A;
            return !(!d(R) || typeof (A = R.then) != 'function') && A;
          },
          V = function (R) {
            return j(I, R) ? new J(R) : new o(R);
          },
          J = (o = function (R) {
            var A, S;
            (this.promise = new R(function (W, de) {
              if (A !== void 0 || S !== void 0) throw P('Bad Promise constructor');
              (A = W), (S = de);
            })),
              (this.resolve = p(A)),
              (this.reject = p(S));
          }),
          B = function (R) {
            try {
              R();
            } catch (A) {
              return { error: A };
            }
          },
          K = function (R, A) {
            if (!R._n) {
              R._n = !0;
              var S = R._c;
              O(function () {
                for (
                  var W = R._v,
                    de = R._s == 1,
                    It = 0,
                    ct = function (yt) {
                      var _e,
                        Yr,
                        _r = de ? yt.ok : yt.fail,
                        Pe = yt.resolve,
                        zt = yt.reject,
                        y = yt.domain;
                      try {
                        _r
                          ? (de || (R._h == 2 && H(R), (R._h = 1)),
                            _r === !0
                              ? (_e = W)
                              : (y && y.enter(), (_e = _r(W)), y && y.exit()),
                            _e === yt.promise
                              ? zt(P('Promise-chain cycle'))
                              : (Yr = X(_e))
                              ? Yr.call(_e, Pe, zt)
                              : Pe(_e))
                          : zt(W);
                      } catch (_) {
                        zt(_);
                      }
                    };
                  S.length > It;

                )
                  ct(S[It++]);
                (R._c = []), (R._n = !1), A && !R._h && $(R);
              });
            }
          },
          $ = function (R) {
            L.call(l, function () {
              var A,
                S,
                W,
                de = R._v;
              if (
                (k(R) &&
                  ((A = B(function () {
                    G
                      ? z.emit('unhandledRejection', de, R)
                      : (S = l.onunhandledrejection)
                      ? S({ promise: R, reason: de })
                      : (W = l.console) &&
                        W.error &&
                        W.error('Unhandled promise rejection', de);
                  })),
                  (R._h = G || k(R) ? 2 : 1)),
                (R._a = void 0),
                A)
              )
                throw A.error;
            });
          },
          k = function (R) {
            if (R._h == 1) return !1;
            for (var A, S = R._a || R._c, W = 0; S.length > W; )
              if (((A = S[W++]), A.fail || !k(A.promise))) return !1;
            return !0;
          },
          H = function (R) {
            L.call(l, function () {
              var A;
              G
                ? z.emit('rejectionHandled', R)
                : (A = l.onrejectionhandled) && A({ promise: R, reason: R._v });
            });
          },
          le = function (R) {
            var A = this;
            A._d ||
              ((A._d = !0),
              (A = A._w || A),
              (A._v = R),
              (A._s = 2),
              A._a || (A._a = A._c.slice()),
              K(A, !0));
          },
          Re = function (R) {
            var A,
              S = this;
            if (!S._d) {
              (S._d = !0), (S = S._w || S);
              try {
                if (S === R) throw P("Promise can't be resolved itself");
                (A = X(R))
                  ? O(function () {
                      var W = { _w: S, _d: !1 };
                      try {
                        A.call(R, u(Re, W, 1), u(le, W, 1));
                      } catch (de) {
                        le.call(W, de);
                      }
                    })
                  : ((S._v = R), (S._s = 1), K(S, !1));
              } catch (W) {
                le.call({ _w: S, _d: !1 }, W);
              }
            }
          };
        C ||
          ((I = function (R) {
            v(this, I, N, '_h'), p(R), s.call(this);
            try {
              R(u(Re, this, 1), u(le, this, 1));
            } catch (A) {
              le.call(this, A);
            }
          }),
          (s = function (R) {
            (this._c = []),
              (this._a = void 0),
              (this._s = 0),
              (this._d = !1),
              (this._v = void 0),
              (this._h = 0),
              (this._n = !1);
          }),
          (s.prototype = i(56)(I.prototype, {
            then: function (R, A) {
              var S = V(w(this, I));
              return (
                (S.ok = typeof R != 'function' || R),
                (S.fail = typeof A == 'function' && A),
                (S.domain = G ? z.domain : void 0),
                this._c.push(S),
                this._a && this._a.push(S),
                this._s && K(this, !1),
                S.promise
              );
            },
            catch: function (R) {
              return this.then(void 0, R);
            },
          })),
          (J = function () {
            var R = new s();
            (this.promise = R), (this.resolve = u(Re, R, 1)), (this.reject = u(le, R, 1));
          })),
          h(h.G + h.W + h.F * !C, { Promise: I }),
          i(18)(I, N),
          i(59)(N),
          (a = i(6)[N]),
          h(h.S + h.F * !C, N, {
            reject: function (R) {
              var A = V(this),
                S = A.reject;
              return S(R), A.promise;
            },
          }),
          h(h.S + h.F * (c || !C), N, {
            resolve: function (R) {
              if (R instanceof I && j(R.constructor, this)) return R;
              var A = V(this),
                S = A.resolve;
              return S(R), A.promise;
            },
          }),
          h(
            h.S +
              h.F *
                !(
                  C &&
                  i(46)(function (R) {
                    I.all(R).catch(T);
                  })
                ),
            N,
            {
              all: function (R) {
                var A = this,
                  S = V(A),
                  W = S.resolve,
                  de = S.reject,
                  It = B(function () {
                    var ct = [],
                      yt = 0,
                      _e = 1;
                    m(R, !1, function (Yr) {
                      var _r = yt++,
                        Pe = !1;
                      ct.push(void 0),
                        _e++,
                        A.resolve(Yr).then(function (zt) {
                          Pe || ((Pe = !0), (ct[_r] = zt), --_e || W(ct));
                        }, de);
                    }),
                      --_e || W(ct);
                  });
                return It && de(It.error), S.promise;
              },
              race: function (R) {
                var A = this,
                  S = V(A),
                  W = S.reject,
                  de = B(function () {
                    m(R, !1, function (It) {
                      A.resolve(It).then(S.resolve, W);
                    });
                  });
                return de && W(de.error), S.promise;
              },
            },
          );
      },
      function (r, n, i) {
        'use strict';
        var s = i(61)(!0);
        i(27)(
          String,
          'String',
          function (o) {
            (this._t = String(o)), (this._i = 0);
          },
          function () {
            var o,
              a = this._t,
              c = this._i;
            return c >= a.length
              ? { value: void 0, done: !0 }
              : ((o = s(a, c)), (this._i += o.length), { value: o, done: !1 });
          },
        );
      },
      function (r, n, i) {
        i(65);
        for (
          var s = i(2),
            o = i(5),
            a = i(10),
            c = i(1)('toStringTag'),
            l = [
              'NodeList',
              'DOMTokenList',
              'MediaList',
              'StyleSheetList',
              'CSSRuleList',
            ],
            u = 0;
          u < 5;
          u++
        ) {
          var f = l[u],
            h = s[f],
            d = h && h.prototype;
          d && !d[c] && o(d, c, f), (a[f] = a.Array);
        }
      },
      function (r, n) {
        r.exports = require('child_process');
      },
      function (r, n) {
        r.exports = require('crypto');
      },
    ]);
  });
});
var rh = {};
Nt(rh, {
  configureLightClientRequire: () => gv,
  configuredPaths: () => vr,
  lightClientRequire: () => ne,
});
function gv(t) {
  (vr = t),
    (ne = function (e) {
      if (vr.length === 0)
        throw new Error(
          'Light client require must have paths configured with `configureLightClientRequire`.',
        );
      let r;
      try {
        r = require.resolve(e, { paths: t });
      } catch (n) {
        throw (
          (process.env.NX_VERBOSE_LOGGING === 'true' &&
            console.error(
              `Was not able to require.resolve module ${e} from the following paths: ${t}. This may be expected.`,
            ),
          n)
        );
      }
      try {
        return require(r);
      } catch (n) {
        throw (
          (process.env.NX_VERBOSE_LOGGING === 'true' &&
            console.error(
              `Was not able require module ${e} from path ${r}. This may be expected. `,
            ),
          n)
        );
      }
    });
}
var ne,
  vr,
  Sr = q(() => {
    'use strict';
    vr = [];
  });
var Y = E((wr) => {
  'use strict';
  Sr();
  try {
    try {
      let { output: t } = ne('nx/src/utils/output'),
        e;
      try {
        e = ne('nx/src/utils/app-root').workspaceRoot;
      } catch {
        e = ne('nx/src/utils/workspace-root').workspaceRoot;
      }
      (wr.workspaceRoot = e), (wr.output = t);
    } catch {
      let { output: e } = ne('@nrwl/workspace/src/utilities/output'),
        { appRootPath: r } = ne('@nrwl/tao/src/utils/app-root');
      (wr.workspaceRoot = r), (wr.output = e);
    }
  } catch {
    let e = (r) => {
      var n;
      return `${r.title}

${
  (n = r.bodyLines) == null
    ? void 0
    : n.join(`
`)
}`;
    };
    (wr.output = {
      note: (r) => console.info(e(r)),
      error: (r) => console.error(e(r)),
      warn: (r) => console.warn(e(r)),
      success: (r) => console.log(e(r)),
      addVerticalSeparator: () => '',
      addNewline: () =>
        console.log(`
`),
    }),
      (wr.workspaceRoot = process.cwd());
  }
});
function ut(t) {
  return !!t;
}
function uh() {
  return process.env.NX_INVOKED_BY_RUNNER === 'true' || process.env.NX_CLOUD === 'false';
}
function et() {
  try {
    return (0, la.execSync)('git rev-parse HEAD', { stdio: 'pipe' }).toString().trim();
  } catch {
    return;
  }
}
function Vi() {
  try {
    return (0, la.execSync)('git rev-parse --symbolic-full-name HEAD', { stdio: 'pipe' })
      .toString()
      .trim();
  } catch {
    return;
  }
}
function Sv() {
  try {
    let t = (0, ih.readFileSync)((0, Hi.join)(vv, 'nx-cloud.env'));
    return _v.parse(t);
  } catch {
    return {};
  }
}
function wv() {
  let t = Sv();
  (At =
    process.env.NX_CLOUD_AUTH_TOKEN ||
    process.env.NX_CLOUD_ACCESS_TOKEN ||
    t.NX_CLOUD_AUTH_TOKEN ||
    t.NX_CLOUD_ACCESS_TOKEN),
    (Rr = process.env.NX_CLOUD_ENCRYPTION_KEY || t.NX_CLOUD_ENCRYPTION_KEY),
    (F = process.env.NX_VERBOSE_LOGGING === 'true' || t.NX_VERBOSE_LOGGING === 'true'),
    (Et =
      process.env.NX_CLOUD_NO_TIMEOUTS === 'true' || t.NX_CLOUD_NO_TIMEOUTS === 'true');
}
function je() {
  return lh();
}
function lh() {
  return process.env.NX_CI_EXECUTION_ID !== void 0
    ? process.env.NX_CI_EXECUTION_ID
    : process.env.NX_RUN_GROUP !== void 0
    ? process.env.NX_RUN_GROUP
    : process.env.CIRCLECI !== void 0 && process.env.CIRCLE_WORKFLOW_ID
    ? process.env.CIRCLE_WORKFLOW_ID
    : process.env.TRAVIS_BUILD_ID !== void 0
    ? process.env.TRAVIS_BUILD_ID
    : process.env.GITHUB_ACTIONS && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
    : process.env.BUILD_BUILDID
    ? process.env.BUILD_BUILDID
    : process.env.BITBUCKET_BUILD_NUMBER !== void 0
    ? process.env.BITBUCKET_BUILD_NUMBER
    : process.env.VERCEL_GIT_COMMIT_SHA !== void 0
    ? process.env.VERCEL_GIT_COMMIT_SHA
    : process.env.CI_PIPELINE_ID
    ? process.env.CI_PIPELINE_ID
    : process.env.BUILD_TAG
    ? process.env.BUILD_TAG
    : null;
}
function xe() {
  return process.env.NX_CI_EXECUTION_ENV ?? '';
}
function ve() {
  if (process.env.NX_RUN_GROUP !== void 0) return process.env.NX_RUN_GROUP;
  let t = lh();
  return t ? (xe() ? `${t}-${xe()}` : t) : et();
}
function me() {
  if (process.env.NX_BRANCH !== void 0) return process.env.NX_BRANCH;
  if (process.env.CIRCLECI !== void 0) {
    if (process.env.CIRCLE_PR_NUMBER !== void 0) return process.env.CIRCLE_PR_NUMBER;
    if (process.env.CIRCLE_PULL_REQUEST !== void 0) {
      let t = process.env.CIRCLE_PULL_REQUEST.split('/');
      return t[t.length - 1];
    } else if (process.env.CIRCLE_BRANCH !== void 0) return process.env.CIRCLE_BRANCH;
  }
  if (process.env.TRAVIS_PULL_REQUEST !== void 0) return process.env.TRAVIS_PULL_REQUEST;
  if (process.env.GITHUB_ACTIONS) {
    if (process.env.GITHUB_REF) {
      let t = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
      if (t) return t[1];
    }
    return process.env.GITHUB_HEAD_REF ?? '';
  }
  return process.env.BITBUCKET_PR_ID !== void 0
    ? process.env.BITBUCKET_PR_ID
    : process.env.VERCEL_GIT_COMMIT_REF !== void 0
    ? process.env.VERCEL_GIT_COMMIT_REF
    : process.env.CI_MERGE_REQUEST_IID
    ? process.env.CI_MERGE_REQUEST_IID
    : process.env.CI_COMMIT_BRANCH
    ? process.env.CI_COMMIT_BRANCH
    : process.env.GIT_BRANCH
    ? process.env.GIT_BRANCH
    : null;
}
function Jr() {
  let t = require('os'),
    e = (0, nh.createHash)('md5');
  return (
    e.update(bv()),
    {
      machineId: e.digest('base64'),
      platform: t.platform(),
      version: t.version ? t.version() : '',
      cpuCores: t.cpus().length,
    }
  );
}
function Wi() {
  let t = (0, Hi.parse)(process.argv[1]).name,
    e = `${process.argv.slice(2).join(' ')}`;
  return `${t} ${e}`;
}
var la,
  nh,
  ih,
  Hi,
  _v,
  bv,
  vv,
  Xn,
  fa,
  ha,
  Kn,
  sh,
  Yn,
  Vt,
  da,
  oh,
  ah,
  zi,
  ch,
  At,
  Rr,
  F,
  Et,
  ie = q(() => {
    'use strict';
    (la = require('child_process')),
      (nh = require('crypto')),
      (ih = require('fs')),
      (Hi = require('path'));
    Yf();
    (_v = eh()),
      ({ machineIdSync: bv } = th()),
      ({ workspaceRoot: vv } = Y()),
      (Xn = 9999999),
      (fa = process.env.NX_CLOUD_AGENT_TIMEOUT_MS
        ? Number(process.env.NX_CLOUD_AGENT_TIMEOUT_MS)
        : 36e5),
      (ha = process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS
        ? Number(process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS)
        : 36e5),
      (Kn = 1e3 * 1e3 * 1e4),
      (sh = process.env.NX_CLOUD_UNLIMITED_OUTPUT === 'true'),
      (Yn = 1e3 * 1e3 * 300),
      (Vt = 166),
      (da = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT
        ? Number(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT)
        : null),
      (oh = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE != 'false'),
      (ah = process.env.NX_CLOUD_FORCE_METRICS === 'true'),
      (zi = process.env.NX_CLOUD_NUMBER_OF_RETRIES
        ? Number(process.env.NX_CLOUD_NUMBER_OF_RETRIES)
        : Kf()
        ? 10
        : 1),
      (ch = process.env.NX_NO_CLOUD === 'true');
    wv();
  });
function tt(t) {
  return new Promise((e) => {
    setTimeout(() => e(null), t);
  });
}
var Jn = q(() => {
  'use strict';
});
var pa = E((UN, fh) => {
  'use strict';
  fh.exports = function (e, r) {
    return function () {
      for (var i = new Array(arguments.length), s = 0; s < i.length; s++)
        i[s] = arguments[s];
      return e.apply(r, i);
    };
  };
});
var Fe = E((FN, ph) => {
  'use strict';
  var Rv = pa(),
    xr = Object.prototype.toString;
  function Ea(t) {
    return xr.call(t) === '[object Array]';
  }
  function ma(t) {
    return typeof t > 'u';
  }
  function xv(t) {
    return (
      t !== null &&
      !ma(t) &&
      t.constructor !== null &&
      !ma(t.constructor) &&
      typeof t.constructor.isBuffer == 'function' &&
      t.constructor.isBuffer(t)
    );
  }
  function Ov(t) {
    return xr.call(t) === '[object ArrayBuffer]';
  }
  function Tv(t) {
    return typeof FormData < 'u' && t instanceof FormData;
  }
  function Cv(t) {
    var e;
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (e = ArrayBuffer.isView(t))
        : (e = t && t.buffer && t.buffer instanceof ArrayBuffer),
      e
    );
  }
  function Iv(t) {
    return typeof t == 'string';
  }
  function Nv(t) {
    return typeof t == 'number';
  }
  function hh(t) {
    return t !== null && typeof t == 'object';
  }
  function Xi(t) {
    if (xr.call(t) !== '[object Object]') return !1;
    var e = Object.getPrototypeOf(t);
    return e === null || e === Object.prototype;
  }
  function Av(t) {
    return xr.call(t) === '[object Date]';
  }
  function Dv(t) {
    return xr.call(t) === '[object File]';
  }
  function Lv(t) {
    return xr.call(t) === '[object Blob]';
  }
  function dh(t) {
    return xr.call(t) === '[object Function]';
  }
  function kv(t) {
    return hh(t) && dh(t.pipe);
  }
  function Pv(t) {
    return typeof URLSearchParams < 'u' && t instanceof URLSearchParams;
  }
  function Uv(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
  }
  function Fv() {
    return typeof navigator < 'u' &&
      (navigator.product === 'ReactNative' ||
        navigator.product === 'NativeScript' ||
        navigator.product === 'NS')
      ? !1
      : typeof window < 'u' && typeof document < 'u';
  }
  function ga(t, e) {
    if (!(t === null || typeof t > 'u'))
      if ((typeof t != 'object' && (t = [t]), Ea(t)))
        for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t);
      else
        for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t);
  }
  function ya() {
    var t = {};
    function e(i, s) {
      Xi(t[s]) && Xi(i)
        ? (t[s] = ya(t[s], i))
        : Xi(i)
        ? (t[s] = ya({}, i))
        : Ea(i)
        ? (t[s] = i.slice())
        : (t[s] = i);
    }
    for (var r = 0, n = arguments.length; r < n; r++) ga(arguments[r], e);
    return t;
  }
  function Mv(t, e, r) {
    return (
      ga(e, function (i, s) {
        r && typeof i == 'function' ? (t[s] = Rv(i, r)) : (t[s] = i);
      }),
      t
    );
  }
  function qv(t) {
    return t.charCodeAt(0) === 65279 && (t = t.slice(1)), t;
  }
  ph.exports = {
    isArray: Ea,
    isArrayBuffer: Ov,
    isBuffer: xv,
    isFormData: Tv,
    isArrayBufferView: Cv,
    isString: Iv,
    isNumber: Nv,
    isObject: hh,
    isPlainObject: Xi,
    isUndefined: ma,
    isDate: Av,
    isFile: Dv,
    isBlob: Lv,
    isFunction: dh,
    isStream: kv,
    isURLSearchParams: Pv,
    isStandardBrowserEnv: Fv,
    forEach: ga,
    merge: ya,
    extend: Mv,
    trim: Uv,
    stripBOM: qv,
  };
});
var Ki = E((MN, yh) => {
  'use strict';
  var Zr = Fe();
  function mh(t) {
    return encodeURIComponent(t)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  yh.exports = function (e, r, n) {
    if (!r) return e;
    var i;
    if (n) i = n(r);
    else if (Zr.isURLSearchParams(r)) i = r.toString();
    else {
      var s = [];
      Zr.forEach(r, function (c, l) {
        c === null ||
          typeof c > 'u' ||
          (Zr.isArray(c) ? (l = l + '[]') : (c = [c]),
          Zr.forEach(c, function (f) {
            Zr.isDate(f)
              ? (f = f.toISOString())
              : Zr.isObject(f) && (f = JSON.stringify(f)),
              s.push(mh(l) + '=' + mh(f));
          }));
      }),
        (i = s.join('&'));
    }
    if (i) {
      var o = e.indexOf('#');
      o !== -1 && (e = e.slice(0, o)), (e += (e.indexOf('?') === -1 ? '?' : '&') + i);
    }
    return e;
  };
});
var gh = E((qN, Eh) => {
  'use strict';
  var Bv = Fe();
  function Yi() {
    this.handlers = [];
  }
  Yi.prototype.use = function (e, r, n) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  };
  Yi.prototype.eject = function (e) {
    this.handlers[e] && (this.handlers[e] = null);
  };
  Yi.prototype.forEach = function (e) {
    Bv.forEach(this.handlers, function (n) {
      n !== null && e(n);
    });
  };
  Eh.exports = Yi;
});
var bh = E((BN, _h) => {
  'use strict';
  var jv = Fe();
  _h.exports = function (e, r) {
    jv.forEach(e, function (i, s) {
      s !== r && s.toUpperCase() === r.toUpperCase() && ((e[r] = i), delete e[s]);
    });
  };
});
var Ji = E((jN, vh) => {
  'use strict';
  vh.exports = function (e, r, n, i, s) {
    return (
      (e.config = r),
      n && (e.code = n),
      (e.request = i),
      (e.response = s),
      (e.isAxiosError = !0),
      (e.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
        };
      }),
      e
    );
  };
});
var Zi = E((GN, Sh) => {
  'use strict';
  var Gv = Ji();
  Sh.exports = function (e, r, n, i, s) {
    var o = new Error(e);
    return Gv(o, r, n, i, s);
  };
});
var _a = E(($N, wh) => {
  'use strict';
  var $v = Zi();
  wh.exports = function (e, r, n) {
    var i = n.config.validateStatus;
    !n.status || !i || i(n.status)
      ? e(n)
      : r(
          $v('Request failed with status code ' + n.status, n.config, null, n.request, n),
        );
  };
});
var xh = E((HN, Rh) => {
  'use strict';
  var Qi = Fe();
  Rh.exports = Qi.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (r, n, i, s, o, a) {
            var c = [];
            c.push(r + '=' + encodeURIComponent(n)),
              Qi.isNumber(i) && c.push('expires=' + new Date(i).toGMTString()),
              Qi.isString(s) && c.push('path=' + s),
              Qi.isString(o) && c.push('domain=' + o),
              a === !0 && c.push('secure'),
              (document.cookie = c.join('; '));
          },
          read: function (r) {
            var n = document.cookie.match(new RegExp('(^|;\\s*)(' + r + ')=([^;]*)'));
            return n ? decodeURIComponent(n[3]) : null;
          },
          remove: function (r) {
            this.write(r, '', Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })();
});
var Th = E((zN, Oh) => {
  'use strict';
  Oh.exports = function (e) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
  };
});
var Ih = E((VN, Ch) => {
  'use strict';
  Ch.exports = function (e, r) {
    return r ? e.replace(/\/+$/, '') + '/' + r.replace(/^\/+/, '') : e;
  };
});
var ba = E((WN, Nh) => {
  'use strict';
  var Hv = Th(),
    zv = Ih();
  Nh.exports = function (e, r) {
    return e && !Hv(r) ? zv(e, r) : r;
  };
});
var Dh = E((XN, Ah) => {
  'use strict';
  var va = Fe(),
    Vv = [
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ];
  Ah.exports = function (e) {
    var r = {},
      n,
      i,
      s;
    return (
      e &&
        va.forEach(
          e.split(`
`),
          function (a) {
            if (
              ((s = a.indexOf(':')),
              (n = va.trim(a.substr(0, s)).toLowerCase()),
              (i = va.trim(a.substr(s + 1))),
              n)
            ) {
              if (r[n] && Vv.indexOf(n) >= 0) return;
              n === 'set-cookie'
                ? (r[n] = (r[n] ? r[n] : []).concat([i]))
                : (r[n] = r[n] ? r[n] + ', ' + i : i);
            }
          },
        ),
      r
    );
  };
});
var Ph = E((KN, kh) => {
  'use strict';
  var Lh = Fe();
  kh.exports = Lh.isStandardBrowserEnv()
    ? (function () {
        var e = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement('a'),
          n;
        function i(s) {
          var o = s;
          return (
            e && (r.setAttribute('href', o), (o = r.href)),
            r.setAttribute('href', o),
            {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, '') : '',
              hash: r.hash ? r.hash.replace(/^#/, '') : '',
              hostname: r.hostname,
              port: r.port,
              pathname: r.pathname.charAt(0) === '/' ? r.pathname : '/' + r.pathname,
            }
          );
        }
        return (
          (n = i(window.location.href)),
          function (o) {
            var a = Lh.isString(o) ? i(o) : o;
            return a.protocol === n.protocol && a.host === n.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
});
var Fh = E((YN, Uh) => {
  'use strict';
  var es = Fe(),
    Wv = _a(),
    Xv = xh(),
    Kv = Ki(),
    Yv = ba(),
    Jv = Dh(),
    Zv = Ph(),
    Sa = Zi();
  Uh.exports = function (e) {
    return new Promise(function (n, i) {
      var s = e.data,
        o = e.headers,
        a = e.responseType;
      es.isFormData(s) && delete o['Content-Type'];
      var c = new XMLHttpRequest();
      if (e.auth) {
        var l = e.auth.username || '',
          u = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
        o.Authorization = 'Basic ' + btoa(l + ':' + u);
      }
      var f = Yv(e.baseURL, e.url);
      c.open(e.method.toUpperCase(), Kv(f, e.params, e.paramsSerializer), !0),
        (c.timeout = e.timeout);
      function h() {
        if (c) {
          var p = 'getAllResponseHeaders' in c ? Jv(c.getAllResponseHeaders()) : null,
            v = !a || a === 'text' || a === 'json' ? c.responseText : c.response,
            m = {
              data: v,
              status: c.status,
              statusText: c.statusText,
              headers: p,
              config: e,
              request: c,
            };
          Wv(n, i, m), (c = null);
        }
      }
      if (
        ('onloadend' in c
          ? (c.onloadend = h)
          : (c.onreadystatechange = function () {
              !c ||
                c.readyState !== 4 ||
                (c.status === 0 &&
                  !(c.responseURL && c.responseURL.indexOf('file:') === 0)) ||
                setTimeout(h);
            }),
        (c.onabort = function () {
          c && (i(Sa('Request aborted', e, 'ECONNABORTED', c)), (c = null));
        }),
        (c.onerror = function () {
          i(Sa('Network Error', e, null, c)), (c = null);
        }),
        (c.ontimeout = function () {
          var v = 'timeout of ' + e.timeout + 'ms exceeded';
          e.timeoutErrorMessage && (v = e.timeoutErrorMessage),
            i(
              Sa(
                v,
                e,
                e.transitional && e.transitional.clarifyTimeoutError
                  ? 'ETIMEDOUT'
                  : 'ECONNABORTED',
                c,
              ),
            ),
            (c = null);
        }),
        es.isStandardBrowserEnv())
      ) {
        var d =
          (e.withCredentials || Zv(f)) && e.xsrfCookieName
            ? Xv.read(e.xsrfCookieName)
            : void 0;
        d && (o[e.xsrfHeaderName] = d);
      }
      'setRequestHeader' in c &&
        es.forEach(o, function (v, m) {
          typeof s > 'u' && m.toLowerCase() === 'content-type'
            ? delete o[m]
            : c.setRequestHeader(m, v);
        }),
        es.isUndefined(e.withCredentials) || (c.withCredentials = !!e.withCredentials),
        a && a !== 'json' && (c.responseType = e.responseType),
        typeof e.onDownloadProgress == 'function' &&
          c.addEventListener('progress', e.onDownloadProgress),
        typeof e.onUploadProgress == 'function' &&
          c.upload &&
          c.upload.addEventListener('progress', e.onUploadProgress),
        e.cancelToken &&
          e.cancelToken.promise.then(function (v) {
            c && (c.abort(), i(v), (c = null));
          }),
        s || (s = null),
        c.send(s);
    });
  };
});
var qh = E((JN, Mh) => {
  'use strict';
  var Qr = 1e3,
    en = Qr * 60,
    tn = en * 60,
    Or = tn * 24,
    Qv = Or * 7,
    eS = Or * 365.25;
  Mh.exports = function (t, e) {
    e = e || {};
    var r = typeof t;
    if (r === 'string' && t.length > 0) return tS(t);
    if (r === 'number' && isFinite(t)) return e.long ? nS(t) : rS(t);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' + JSON.stringify(t),
    );
  };
  function tS(t) {
    if (((t = String(t)), !(t.length > 100))) {
      var e =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          t,
        );
      if (e) {
        var r = parseFloat(e[1]),
          n = (e[2] || 'ms').toLowerCase();
        switch (n) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return r * eS;
          case 'weeks':
          case 'week':
          case 'w':
            return r * Qv;
          case 'days':
          case 'day':
          case 'd':
            return r * Or;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return r * tn;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return r * en;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return r * Qr;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return r;
          default:
            return;
        }
      }
    }
  }
  function rS(t) {
    var e = Math.abs(t);
    return e >= Or
      ? Math.round(t / Or) + 'd'
      : e >= tn
      ? Math.round(t / tn) + 'h'
      : e >= en
      ? Math.round(t / en) + 'm'
      : e >= Qr
      ? Math.round(t / Qr) + 's'
      : t + 'ms';
  }
  function nS(t) {
    var e = Math.abs(t);
    return e >= Or
      ? ts(t, e, Or, 'day')
      : e >= tn
      ? ts(t, e, tn, 'hour')
      : e >= en
      ? ts(t, e, en, 'minute')
      : e >= Qr
      ? ts(t, e, Qr, 'second')
      : t + ' ms';
  }
  function ts(t, e, r, n) {
    var i = e >= r * 1.5;
    return Math.round(t / r) + ' ' + n + (i ? 's' : '');
  }
});
var wa = E((ZN, Bh) => {
  'use strict';
  function iS(t) {
    (r.debug = r),
      (r.default = r),
      (r.coerce = c),
      (r.disable = s),
      (r.enable = i),
      (r.enabled = o),
      (r.humanize = qh()),
      (r.destroy = l),
      Object.keys(t).forEach((u) => {
        r[u] = t[u];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {});
    function e(u) {
      let f = 0;
      for (let h = 0; h < u.length; h++) (f = (f << 5) - f + u.charCodeAt(h)), (f |= 0);
      return r.colors[Math.abs(f) % r.colors.length];
    }
    r.selectColor = e;
    function r(u) {
      let f,
        h = null,
        d,
        p;
      function v(...m) {
        if (!v.enabled) return;
        let w = v,
          L = Number(new Date()),
          O = L - (f || L);
        (w.diff = O),
          (w.prev = f),
          (w.curr = L),
          (f = L),
          (m[0] = r.coerce(m[0])),
          typeof m[0] != 'string' && m.unshift('%O');
        let N = 0;
        (m[0] = m[0].replace(/%([a-zA-Z%])/g, (I, z) => {
          if (I === '%%') return '%';
          N++;
          let G = r.formatters[z];
          if (typeof G == 'function') {
            let T = m[N];
            (I = G.call(w, T)), m.splice(N, 1), N--;
          }
          return I;
        })),
          r.formatArgs.call(w, m),
          (w.log || r.log).apply(w, m);
      }
      return (
        (v.namespace = u),
        (v.useColors = r.useColors()),
        (v.color = r.selectColor(u)),
        (v.extend = n),
        (v.destroy = r.destroy),
        Object.defineProperty(v, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () =>
            h !== null
              ? h
              : (d !== r.namespaces && ((d = r.namespaces), (p = r.enabled(u))), p),
          set: (m) => {
            h = m;
          },
        }),
        typeof r.init == 'function' && r.init(v),
        v
      );
    }
    function n(u, f) {
      let h = r(this.namespace + (typeof f > 'u' ? ':' : f) + u);
      return (h.log = this.log), h;
    }
    function i(u) {
      r.save(u), (r.namespaces = u), (r.names = []), (r.skips = []);
      let f,
        h = (typeof u == 'string' ? u : '').split(/[\s,]+/),
        d = h.length;
      for (f = 0; f < d; f++)
        h[f] &&
          ((u = h[f].replace(/\*/g, '.*?')),
          u[0] === '-'
            ? r.skips.push(new RegExp('^' + u.slice(1) + '$'))
            : r.names.push(new RegExp('^' + u + '$')));
    }
    function s() {
      let u = [...r.names.map(a), ...r.skips.map(a).map((f) => '-' + f)].join(',');
      return r.enable(''), u;
    }
    function o(u) {
      if (u[u.length - 1] === '*') return !0;
      let f, h;
      for (f = 0, h = r.skips.length; f < h; f++) if (r.skips[f].test(u)) return !1;
      for (f = 0, h = r.names.length; f < h; f++) if (r.names[f].test(u)) return !0;
      return !1;
    }
    function a(u) {
      return u
        .toString()
        .substring(2, u.toString().length - 2)
        .replace(/\.\*\?$/, '*');
    }
    function c(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
      );
    }
    return r.enable(r.load()), r;
  }
  Bh.exports = iS;
});
var jh = E((Xe, rs) => {
  'use strict';
  Xe.formatArgs = oS;
  Xe.save = aS;
  Xe.load = cS;
  Xe.useColors = sS;
  Xe.storage = uS();
  Xe.destroy = (() => {
    let t = !1;
    return () => {
      t ||
        ((t = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
        ));
    };
  })();
  Xe.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ];
  function sS() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function oS(t) {
    if (
      ((t[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        t[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        rs.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let e = 'color: ' + this.color;
    t.splice(1, 0, e, 'color: inherit');
    let r = 0,
      n = 0;
    t[0].replace(/%[a-zA-Z%]/g, (i) => {
      i !== '%%' && (r++, i === '%c' && (n = r));
    }),
      t.splice(n, 0, e);
  }
  Xe.log = console.debug || console.log || (() => {});
  function aS(t) {
    try {
      t ? Xe.storage.setItem('debug', t) : Xe.storage.removeItem('debug');
    } catch {}
  }
  function cS() {
    let t;
    try {
      t = Xe.storage.getItem('debug');
    } catch {}
    return !t && typeof process < 'u' && 'env' in process && (t = process.env.DEBUG), t;
  }
  function uS() {
    try {
      return localStorage;
    } catch {}
  }
  rs.exports = wa()(Xe);
  var { formatters: lS } = rs.exports;
  lS.j = function (t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return '[UnexpectedJSONParseError]: ' + e.message;
    }
  };
});
var $h = E((QN, Gh) => {
  'use strict';
  Gh.exports = (t, e = process.argv) => {
    let r = t.startsWith('-') ? '' : t.length === 1 ? '-' : '--',
      n = e.indexOf(r + t),
      i = e.indexOf('--');
    return n !== -1 && (i === -1 || n < i);
  };
});
var Vh = E((eA, zh) => {
  'use strict';
  var fS = require('os'),
    Hh = require('tty'),
    rt = $h(),
    { env: ye } = process,
    Wt;
  rt('no-color') || rt('no-colors') || rt('color=false') || rt('color=never')
    ? (Wt = 0)
    : (rt('color') || rt('colors') || rt('color=true') || rt('color=always')) && (Wt = 1);
  'FORCE_COLOR' in ye &&
    (ye.FORCE_COLOR === 'true'
      ? (Wt = 1)
      : ye.FORCE_COLOR === 'false'
      ? (Wt = 0)
      : (Wt =
          ye.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(ye.FORCE_COLOR, 10), 3)));
  function Ra(t) {
    return t === 0 ? !1 : { level: t, hasBasic: !0, has256: t >= 2, has16m: t >= 3 };
  }
  function xa(t, e) {
    if (Wt === 0) return 0;
    if (rt('color=16m') || rt('color=full') || rt('color=truecolor')) return 3;
    if (rt('color=256')) return 2;
    if (t && !e && Wt === void 0) return 0;
    let r = Wt || 0;
    if (ye.TERM === 'dumb') return r;
    if (process.platform === 'win32') {
      let n = fS.release().split('.');
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586
        ? Number(n[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ('CI' in ye)
      return [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some((n) => n in ye) || ye.CI_NAME === 'codeship'
        ? 1
        : r;
    if ('TEAMCITY_VERSION' in ye)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ye.TEAMCITY_VERSION) ? 1 : 0;
    if (ye.COLORTERM === 'truecolor') return 3;
    if ('TERM_PROGRAM' in ye) {
      let n = parseInt((ye.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (ye.TERM_PROGRAM) {
        case 'iTerm.app':
          return n >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    return /-256(color)?$/i.test(ye.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(ye.TERM) ||
        'COLORTERM' in ye
      ? 1
      : r;
  }
  function hS(t) {
    let e = xa(t, t && t.isTTY);
    return Ra(e);
  }
  zh.exports = {
    supportsColor: hS,
    stdout: Ra(xa(!0, Hh.isatty(1))),
    stderr: Ra(xa(!0, Hh.isatty(2))),
  };
});
var Xh = E((Se, is) => {
  'use strict';
  var dS = require('tty'),
    ns = require('util');
  Se.init = bS;
  Se.log = ES;
  Se.formatArgs = mS;
  Se.save = gS;
  Se.load = _S;
  Se.useColors = pS;
  Se.destroy = ns.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  Se.colors = [6, 2, 3, 4, 5, 1];
  try {
    let t = Vh();
    t &&
      (t.stderr || t).level >= 2 &&
      (Se.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69,
        74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148,
        149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178,
        179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208,
        209, 214, 215, 220, 221,
      ]);
  } catch {}
  Se.inspectOpts = Object.keys(process.env)
    .filter((t) => /^debug_/i.test(t))
    .reduce((t, e) => {
      let r = e
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (i, s) => s.toUpperCase()),
        n = process.env[e];
      return (
        /^(yes|on|true|enabled)$/i.test(n)
          ? (n = !0)
          : /^(no|off|false|disabled)$/i.test(n)
          ? (n = !1)
          : n === 'null'
          ? (n = null)
          : (n = Number(n)),
        (t[r] = n),
        t
      );
    }, {});
  function pS() {
    return 'colors' in Se.inspectOpts
      ? !!Se.inspectOpts.colors
      : dS.isatty(process.stderr.fd);
  }
  function mS(t) {
    let { namespace: e, useColors: r } = this;
    if (r) {
      let n = this.color,
        i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
        s = `  ${i};1m${e} \x1B[0m`;
      (t[0] =
        s +
        t[0]
          .split(
            `
`,
          )
          .join(
            `
` + s,
          )),
        t.push(i + 'm+' + is.exports.humanize(this.diff) + '\x1B[0m');
    } else t[0] = yS() + e + ' ' + t[0];
  }
  function yS() {
    return Se.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
  }
  function ES(...t) {
    return process.stderr.write(
      ns.format(...t) +
        `
`,
    );
  }
  function gS(t) {
    t ? (process.env.DEBUG = t) : delete process.env.DEBUG;
  }
  function _S() {
    return process.env.DEBUG;
  }
  function bS(t) {
    t.inspectOpts = {};
    let e = Object.keys(Se.inspectOpts);
    for (let r = 0; r < e.length; r++) t.inspectOpts[e[r]] = Se.inspectOpts[e[r]];
  }
  is.exports = wa()(Se);
  var { formatters: Wh } = is.exports;
  Wh.o = function (t) {
    return (
      (this.inspectOpts.colors = this.useColors),
      ns
        .inspect(t, this.inspectOpts)
        .split(
          `
`,
        )
        .map((e) => e.trim())
        .join(' ')
    );
  };
  Wh.O = function (t) {
    return (this.inspectOpts.colors = this.useColors), ns.inspect(t, this.inspectOpts);
  };
});
var Kh = E((tA, Oa) => {
  'use strict';
  typeof process > 'u' ||
  process.type === 'renderer' ||
  process.browser === !0 ||
  process.__nwjs
    ? (Oa.exports = jh())
    : (Oa.exports = Xh());
});
var Jh = E((rA, Yh) => {
  'use strict';
  var Zn;
  Yh.exports = function () {
    if (!Zn) {
      try {
        Zn = Kh()('follow-redirects');
      } catch {}
      typeof Zn != 'function' && (Zn = function () {});
    }
    Zn.apply(null, arguments);
  };
});
var ka = E((nA, La) => {
  'use strict';
  var Tr = require('url'),
    Ta = Tr.URL,
    vS = require('http'),
    SS = require('https'),
    Ia = require('stream').Writable,
    ed = require('assert'),
    td = Jh(),
    Na = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
    Aa = Object.create(null);
  Na.forEach(function (t) {
    Aa[t] = function (e, r, n) {
      this._redirectable.emit(t, e, r, n);
    };
  });
  var wS = ei('ERR_INVALID_URL', 'Invalid URL', TypeError),
    Zh = ei('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
    RS = ei('ERR_FR_TOO_MANY_REDIRECTS', 'Maximum number of redirects exceeded'),
    xS = ei(
      'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
      'Request body larger than maxBodyLength limit',
    ),
    OS = ei('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
    TS = Ia.prototype.destroy || nd;
  function Ge(t, e) {
    Ia.call(this),
      this._sanitizeOptions(t),
      (this._options = t),
      (this._ended = !1),
      (this._ending = !1),
      (this._redirectCount = 0),
      (this._redirects = []),
      (this._requestBodyLength = 0),
      (this._requestBodyBuffers = []),
      e && this.on('response', e);
    var r = this;
    (this._onNativeResponse = function (n) {
      r._processResponse(n);
    }),
      this._performRequest();
  }
  Ge.prototype = Object.create(Ia.prototype);
  Ge.prototype.abort = function () {
    Da(this._currentRequest), this._currentRequest.abort(), this.emit('abort');
  };
  Ge.prototype.destroy = function (t) {
    return Da(this._currentRequest, t), TS.call(this, t), this;
  };
  Ge.prototype.write = function (t, e, r) {
    if (this._ending) throw new OS();
    if (!Cr(t) && !IS(t))
      throw new TypeError('data should be a string, Buffer or Uint8Array');
    if ((Qn(e) && ((r = e), (e = null)), t.length === 0)) {
      r && r();
      return;
    }
    this._requestBodyLength + t.length <= this._options.maxBodyLength
      ? ((this._requestBodyLength += t.length),
        this._requestBodyBuffers.push({ data: t, encoding: e }),
        this._currentRequest.write(t, e, r))
      : (this.emit('error', new xS()), this.abort());
  };
  Ge.prototype.end = function (t, e, r) {
    if ((Qn(t) ? ((r = t), (t = e = null)) : Qn(e) && ((r = e), (e = null)), !t))
      (this._ended = this._ending = !0), this._currentRequest.end(null, null, r);
    else {
      var n = this,
        i = this._currentRequest;
      this.write(t, e, function () {
        (n._ended = !0), i.end(null, null, r);
      }),
        (this._ending = !0);
    }
  };
  Ge.prototype.setHeader = function (t, e) {
    (this._options.headers[t] = e), this._currentRequest.setHeader(t, e);
  };
  Ge.prototype.removeHeader = function (t) {
    delete this._options.headers[t], this._currentRequest.removeHeader(t);
  };
  Ge.prototype.setTimeout = function (t, e) {
    var r = this;
    function n(o) {
      o.setTimeout(t),
        o.removeListener('timeout', o.destroy),
        o.addListener('timeout', o.destroy);
    }
    function i(o) {
      r._timeout && clearTimeout(r._timeout),
        (r._timeout = setTimeout(function () {
          r.emit('timeout'), s();
        }, t)),
        n(o);
    }
    function s() {
      r._timeout && (clearTimeout(r._timeout), (r._timeout = null)),
        r.removeListener('abort', s),
        r.removeListener('error', s),
        r.removeListener('response', s),
        r.removeListener('close', s),
        e && r.removeListener('timeout', e),
        r.socket || r._currentRequest.removeListener('socket', i);
    }
    return (
      e && this.on('timeout', e),
      this.socket ? i(this.socket) : this._currentRequest.once('socket', i),
      this.on('socket', n),
      this.on('abort', s),
      this.on('error', s),
      this.on('response', s),
      this.on('close', s),
      this
    );
  };
  ['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(function (t) {
    Ge.prototype[t] = function (e, r) {
      return this._currentRequest[t](e, r);
    };
  });
  ['aborted', 'connection', 'socket'].forEach(function (t) {
    Object.defineProperty(Ge.prototype, t, {
      get: function () {
        return this._currentRequest[t];
      },
    });
  });
  Ge.prototype._sanitizeOptions = function (t) {
    if (
      (t.headers || (t.headers = {}),
      t.host && (t.hostname || (t.hostname = t.host), delete t.host),
      !t.pathname && t.path)
    ) {
      var e = t.path.indexOf('?');
      e < 0
        ? (t.pathname = t.path)
        : ((t.pathname = t.path.substring(0, e)), (t.search = t.path.substring(e)));
    }
  };
  Ge.prototype._performRequest = function () {
    var t = this._options.protocol,
      e = this._options.nativeProtocols[t];
    if (!e) {
      this.emit('error', new TypeError('Unsupported protocol ' + t));
      return;
    }
    if (this._options.agents) {
      var r = t.slice(0, -1);
      this._options.agent = this._options.agents[r];
    }
    var n = (this._currentRequest = e.request(this._options, this._onNativeResponse));
    n._redirectable = this;
    for (var i of Na) n.on(i, Aa[i]);
    if (
      ((this._currentUrl = /^\//.test(this._options.path)
        ? Tr.format(this._options)
        : this._options.path),
      this._isRedirect)
    ) {
      var s = 0,
        o = this,
        a = this._requestBodyBuffers;
      (function c(l) {
        if (n === o._currentRequest)
          if (l) o.emit('error', l);
          else if (s < a.length) {
            var u = a[s++];
            n.finished || n.write(u.data, u.encoding, c);
          } else o._ended && n.end();
      })();
    }
  };
  Ge.prototype._processResponse = function (t) {
    var e = t.statusCode;
    this._options.trackRedirects &&
      this._redirects.push({ url: this._currentUrl, headers: t.headers, statusCode: e });
    var r = t.headers.location;
    if (!r || this._options.followRedirects === !1 || e < 300 || e >= 400) {
      (t.responseUrl = this._currentUrl),
        (t.redirects = this._redirects),
        this.emit('response', t),
        (this._requestBodyBuffers = []);
      return;
    }
    if (
      (Da(this._currentRequest),
      t.destroy(),
      ++this._redirectCount > this._options.maxRedirects)
    ) {
      this.emit('error', new RS());
      return;
    }
    var n,
      i = this._options.beforeRedirect;
    i && (n = Object.assign({ Host: t.req.getHeader('host') }, this._options.headers));
    var s = this._options.method;
    (((e === 301 || e === 302) && this._options.method === 'POST') ||
      (e === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
      ((this._options.method = 'GET'),
      (this._requestBodyBuffers = []),
      Ca(/^content-/i, this._options.headers));
    var o = Ca(/^host$/i, this._options.headers),
      a = Tr.parse(this._currentUrl),
      c = o || a.host,
      l = /^\w+:/.test(r) ? this._currentUrl : Tr.format(Object.assign(a, { host: c })),
      u;
    try {
      u = Tr.resolve(l, r);
    } catch (p) {
      this.emit('error', new Zh({ cause: p }));
      return;
    }
    td('redirecting to', u), (this._isRedirect = !0);
    var f = Tr.parse(u);
    if (
      (Object.assign(this._options, f),
      ((f.protocol !== a.protocol && f.protocol !== 'https:') ||
        (f.host !== c && !CS(f.host, c))) &&
        Ca(/^(?:authorization|cookie)$/i, this._options.headers),
      Qn(i))
    ) {
      var h = { headers: t.headers, statusCode: e },
        d = { url: l, method: s, headers: n };
      try {
        i(this._options, h, d);
      } catch (p) {
        this.emit('error', p);
        return;
      }
      this._sanitizeOptions(this._options);
    }
    try {
      this._performRequest();
    } catch (p) {
      this.emit('error', new Zh({ cause: p }));
    }
  };
  function rd(t) {
    var e = { maxRedirects: 21, maxBodyLength: 10485760 },
      r = {};
    return (
      Object.keys(t).forEach(function (n) {
        var i = n + ':',
          s = (r[i] = t[n]),
          o = (e[n] = Object.create(s));
        function a(l, u, f) {
          if (Cr(l)) {
            var h;
            try {
              h = Qh(new Ta(l));
            } catch {
              h = Tr.parse(l);
            }
            if (!Cr(h.protocol)) throw new wS({ input: l });
            l = h;
          } else Ta && l instanceof Ta ? (l = Qh(l)) : ((f = u), (u = l), (l = { protocol: i }));
          return (
            Qn(u) && ((f = u), (u = null)),
            (u = Object.assign(
              { maxRedirects: e.maxRedirects, maxBodyLength: e.maxBodyLength },
              l,
              u,
            )),
            (u.nativeProtocols = r),
            !Cr(u.host) && !Cr(u.hostname) && (u.hostname = '::1'),
            ed.equal(u.protocol, i, 'protocol mismatch'),
            td('options', u),
            new Ge(u, f)
          );
        }
        function c(l, u, f) {
          var h = o.request(l, u, f);
          return h.end(), h;
        }
        Object.defineProperties(o, {
          request: { value: a, configurable: !0, enumerable: !0, writable: !0 },
          get: { value: c, configurable: !0, enumerable: !0, writable: !0 },
        });
      }),
      e
    );
  }
  function nd() {}
  function Qh(t) {
    var e = {
      protocol: t.protocol,
      hostname: t.hostname.startsWith('[') ? t.hostname.slice(1, -1) : t.hostname,
      hash: t.hash,
      search: t.search,
      pathname: t.pathname,
      path: t.pathname + t.search,
      href: t.href,
    };
    return t.port !== '' && (e.port = Number(t.port)), e;
  }
  function Ca(t, e) {
    var r;
    for (var n in e) t.test(n) && ((r = e[n]), delete e[n]);
    return r === null || typeof r > 'u' ? void 0 : String(r).trim();
  }
  function ei(t, e, r) {
    function n(i) {
      Error.captureStackTrace(this, this.constructor),
        Object.assign(this, i || {}),
        (this.code = t),
        (this.message = this.cause ? e + ': ' + this.cause.message : e);
    }
    return (
      (n.prototype = new (r || Error)()),
      (n.prototype.constructor = n),
      (n.prototype.name = 'Error [' + t + ']'),
      n
    );
  }
  function Da(t, e) {
    for (var r of Na) t.removeListener(r, Aa[r]);
    t.on('error', nd), t.destroy(e);
  }
  function CS(t, e) {
    ed(Cr(t) && Cr(e));
    var r = t.length - e.length - 1;
    return r > 0 && t[r] === '.' && t.endsWith(e);
  }
  function Cr(t) {
    return typeof t == 'string' || t instanceof String;
  }
  function Qn(t) {
    return typeof t == 'function';
  }
  function IS(t) {
    return typeof t == 'object' && 'length' in t;
  }
  La.exports = rd({ http: vS, https: SS });
  La.exports.wrap = rd;
});
var Pa = E((iA, NS) => {
  NS.exports = {
    name: 'axios',
    version: '0.21.2',
    description: 'Promise based HTTP client for the browser and node.js',
    main: 'index.js',
    scripts: {
      test: 'grunt test',
      start: 'node ./sandbox/server.js',
      build: 'NODE_ENV=production grunt build',
      preversion: 'npm test',
      version:
        'npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json',
      postversion: 'git push && git push --tags',
      examples: 'node ./examples/server.js',
      coveralls: 'cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
      fix: 'eslint --fix lib/**/*.js',
    },
    repository: { type: 'git', url: 'https://github.com/axios/axios.git' },
    keywords: ['xhr', 'http', 'ajax', 'promise', 'node'],
    author: 'Matt Zabriskie',
    license: 'MIT',
    bugs: { url: 'https://github.com/axios/axios/issues' },
    homepage: 'https://axios-http.com',
    devDependencies: {
      coveralls: '^3.0.0',
      'es6-promise': '^4.2.4',
      grunt: '^1.3.0',
      'grunt-banner': '^0.6.0',
      'grunt-cli': '^1.2.0',
      'grunt-contrib-clean': '^1.1.0',
      'grunt-contrib-watch': '^1.0.0',
      'grunt-eslint': '^23.0.0',
      'grunt-karma': '^4.0.0',
      'grunt-mocha-test': '^0.13.3',
      'grunt-ts': '^6.0.0-beta.19',
      'grunt-webpack': '^4.0.2',
      'istanbul-instrumenter-loader': '^1.0.0',
      'jasmine-core': '^2.4.1',
      karma: '^6.3.2',
      'karma-chrome-launcher': '^3.1.0',
      'karma-firefox-launcher': '^2.1.0',
      'karma-jasmine': '^1.1.1',
      'karma-jasmine-ajax': '^0.1.13',
      'karma-safari-launcher': '^1.0.0',
      'karma-sauce-launcher': '^4.3.6',
      'karma-sinon': '^1.0.5',
      'karma-sourcemap-loader': '^0.3.8',
      'karma-webpack': '^4.0.2',
      'load-grunt-tasks': '^3.5.2',
      minimist: '^1.2.0',
      mocha: '^8.2.1',
      sinon: '^4.5.0',
      'terser-webpack-plugin': '^4.2.3',
      typescript: '^4.0.5',
      'url-search-params': '^0.10.0',
      webpack: '^4.44.2',
      'webpack-dev-server': '^3.11.0',
    },
    browser: { './lib/adapters/http.js': './lib/adapters/xhr.js' },
    jsdelivr: 'dist/axios.min.js',
    unpkg: 'dist/axios.min.js',
    typings: './index.d.ts',
    dependencies: { 'follow-redirects': '^1.14.0' },
    bundlesize: [{ path: './dist/axios.min.js', threshold: '5kB' }],
  };
});
var ud = E((sA, cd) => {
  'use strict';
  var ti = Fe(),
    id = _a(),
    AS = ba(),
    DS = Ki(),
    LS = require('http'),
    kS = require('https'),
    PS = ka().http,
    US = ka().https,
    sd = require('url'),
    FS = require('zlib'),
    MS = Pa(),
    ss = Zi(),
    Ua = Ji(),
    od = /https:?/;
  function ad(t, e, r) {
    if (
      ((t.hostname = e.host), (t.host = e.host), (t.port = e.port), (t.path = r), e.auth)
    ) {
      var n = Buffer.from(e.auth.username + ':' + e.auth.password, 'utf8').toString(
        'base64',
      );
      t.headers['Proxy-Authorization'] = 'Basic ' + n;
    }
    t.beforeRedirect = function (s) {
      (s.headers.host = s.host), ad(s, e, s.href);
    };
  }
  cd.exports = function (e) {
    return new Promise(function (n, i) {
      var s = function (k) {
          n(k);
        },
        o = function (k) {
          i(k);
        },
        a = e.data,
        c = e.headers;
      if (
        ('User-Agent' in c || 'user-agent' in c
          ? !c['User-Agent'] &&
            !c['user-agent'] &&
            (delete c['User-Agent'], delete c['user-agent'])
          : (c['User-Agent'] = 'axios/' + MS.version),
        a && !ti.isStream(a))
      ) {
        if (!Buffer.isBuffer(a))
          if (ti.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
          else if (ti.isString(a)) a = Buffer.from(a, 'utf-8');
          else
            return o(
              ss(
                'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                e,
              ),
            );
        c['Content-Length'] = a.length;
      }
      var l = void 0;
      if (e.auth) {
        var u = e.auth.username || '',
          f = e.auth.password || '';
        l = u + ':' + f;
      }
      var h = AS(e.baseURL, e.url),
        d = sd.parse(h),
        p = d.protocol || 'http:';
      if (!l && d.auth) {
        var v = d.auth.split(':'),
          m = v[0] || '',
          w = v[1] || '';
        l = m + ':' + w;
      }
      l && delete c.Authorization;
      var L = od.test(p),
        O = L ? e.httpsAgent : e.httpAgent,
        N = {
          path: DS(d.path, e.params, e.paramsSerializer).replace(/^\?/, ''),
          method: e.method.toUpperCase(),
          headers: c,
          agent: O,
          agents: { http: e.httpAgent, https: e.httpsAgent },
          auth: l,
        };
      e.socketPath
        ? (N.socketPath = e.socketPath)
        : ((N.hostname = d.hostname), (N.port = d.port));
      var P = e.proxy;
      if (!P && P !== !1) {
        var I = p.slice(0, -1) + '_proxy',
          z = process.env[I] || process.env[I.toUpperCase()];
        if (z) {
          var G = sd.parse(z),
            T = process.env.no_proxy || process.env.NO_PROXY,
            C = !0;
          if (T) {
            var j = T.split(',').map(function (k) {
              return k.trim();
            });
            C = !j.some(function (k) {
              return k
                ? k === '*' ||
                  (k[0] === '.' && d.hostname.substr(d.hostname.length - k.length) === k)
                  ? !0
                  : d.hostname === k
                : !1;
            });
          }
          if (
            C &&
            ((P = { host: G.hostname, port: G.port, protocol: G.protocol }), G.auth)
          ) {
            var X = G.auth.split(':');
            P.auth = { username: X[0], password: X[1] };
          }
        }
      }
      P &&
        ((N.headers.host = d.hostname + (d.port ? ':' + d.port : '')),
        ad(N, P, p + '//' + d.hostname + (d.port ? ':' + d.port : '') + N.path));
      var V,
        J = L && (P ? od.test(P.protocol) : !0);
      e.transport
        ? (V = e.transport)
        : e.maxRedirects === 0
        ? (V = J ? kS : LS)
        : (e.maxRedirects && (N.maxRedirects = e.maxRedirects), (V = J ? US : PS)),
        e.maxBodyLength > -1 && (N.maxBodyLength = e.maxBodyLength);
      var B = V.request(N, function (k) {
        if (!B.aborted) {
          var H = k,
            le = k.req || B;
          if (k.statusCode !== 204 && le.method !== 'HEAD' && e.decompress !== !1)
            switch (k.headers['content-encoding']) {
              case 'gzip':
              case 'compress':
              case 'deflate':
                (H = H.pipe(FS.createUnzip())), delete k.headers['content-encoding'];
                break;
            }
          var Re = {
            status: k.statusCode,
            statusText: k.statusMessage,
            headers: k.headers,
            config: e,
            request: le,
          };
          if (e.responseType === 'stream') (Re.data = H), id(s, o, Re);
          else {
            var R = [],
              A = 0;
            H.on('data', function (W) {
              R.push(W),
                (A += W.length),
                e.maxContentLength > -1 &&
                  A > e.maxContentLength &&
                  (H.destroy(),
                  o(
                    ss(
                      'maxContentLength size of ' + e.maxContentLength + ' exceeded',
                      e,
                      null,
                      le,
                    ),
                  ));
            }),
              H.on('error', function (W) {
                B.aborted || o(Ua(W, e, null, le));
              }),
              H.on('end', function () {
                var W = Buffer.concat(R);
                e.responseType !== 'arraybuffer' &&
                  ((W = W.toString(e.responseEncoding)),
                  (!e.responseEncoding || e.responseEncoding === 'utf8') &&
                    (W = ti.stripBOM(W))),
                  (Re.data = W),
                  id(s, o, Re);
              });
          }
        }
      });
      if (
        (B.on('error', function (k) {
          (B.aborted && k.code !== 'ERR_FR_TOO_MANY_REDIRECTS') || o(Ua(k, e, null, B));
        }),
        e.timeout)
      ) {
        var K = parseInt(e.timeout, 10);
        if (isNaN(K)) {
          o(
            ss(
              'error trying to parse `config.timeout` to int',
              e,
              'ERR_PARSE_TIMEOUT',
              B,
            ),
          );
          return;
        }
        B.setTimeout(K, function () {
          B.abort(),
            o(
              ss(
                'timeout of ' + K + 'ms exceeded',
                e,
                e.transitional && e.transitional.clarifyTimeoutError
                  ? 'ETIMEDOUT'
                  : 'ECONNABORTED',
                B,
              ),
            );
        });
      }
      e.cancelToken &&
        e.cancelToken.promise.then(function (k) {
          B.aborted || (B.abort(), o(k));
        }),
        ti.isStream(a)
          ? a
              .on('error', function (k) {
                o(Ua(k, e, null, B));
              })
              .pipe(B)
          : B.end(a);
    });
  };
});
var as = E((oA, hd) => {
  'use strict';
  var Me = Fe(),
    ld = bh(),
    qS = Ji(),
    BS = { 'Content-Type': 'application/x-www-form-urlencoded' };
  function fd(t, e) {
    !Me.isUndefined(t) && Me.isUndefined(t['Content-Type']) && (t['Content-Type'] = e);
  }
  function jS() {
    var t;
    return (
      typeof XMLHttpRequest < 'u'
        ? (t = Fh())
        : typeof process < 'u' &&
          Object.prototype.toString.call(process) === '[object process]' &&
          (t = ud()),
      t
    );
  }
  var os = {
    transitional: {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    adapter: jS(),
    transformRequest: [
      function (e, r) {
        return (
          ld(r, 'Accept'),
          ld(r, 'Content-Type'),
          Me.isFormData(e) ||
          Me.isArrayBuffer(e) ||
          Me.isBuffer(e) ||
          Me.isStream(e) ||
          Me.isFile(e) ||
          Me.isBlob(e)
            ? e
            : Me.isArrayBufferView(e)
            ? e.buffer
            : Me.isURLSearchParams(e)
            ? (fd(r, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
            : Me.isObject(e) || (r && r['Content-Type'] === 'application/json')
            ? (fd(r, 'application/json'), JSON.stringify(e))
            : e
        );
      },
    ],
    transformResponse: [
      function (e) {
        var r = this.transitional,
          n = r && r.silentJSONParsing,
          i = r && r.forcedJSONParsing,
          s = !n && this.responseType === 'json';
        if (s || (i && Me.isString(e) && e.length))
          try {
            return JSON.parse(e);
          } catch (o) {
            if (s) throw o.name === 'SyntaxError' ? qS(o, this, 'E_JSON_PARSE') : o;
          }
        return e;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function (e) {
      return e >= 200 && e < 300;
    },
  };
  os.headers = { common: { Accept: 'application/json, text/plain, */*' } };
  Me.forEach(['delete', 'get', 'head'], function (e) {
    os.headers[e] = {};
  });
  Me.forEach(['post', 'put', 'patch'], function (e) {
    os.headers[e] = Me.merge(BS);
  });
  hd.exports = os;
});
var pd = E((aA, dd) => {
  'use strict';
  var GS = Fe(),
    $S = as();
  dd.exports = function (e, r, n) {
    var i = this || $S;
    return (
      GS.forEach(n, function (o) {
        e = o.call(i, e, r);
      }),
      e
    );
  };
});
var Fa = E((cA, md) => {
  'use strict';
  md.exports = function (e) {
    return !!(e && e.__CANCEL__);
  };
});
var gd = E((uA, Ed) => {
  'use strict';
  var yd = Fe(),
    Ma = pd(),
    HS = Fa(),
    zS = as();
  function qa(t) {
    t.cancelToken && t.cancelToken.throwIfRequested();
  }
  Ed.exports = function (e) {
    qa(e),
      (e.headers = e.headers || {}),
      (e.data = Ma.call(e, e.data, e.headers, e.transformRequest)),
      (e.headers = yd.merge(
        e.headers.common || {},
        e.headers[e.method] || {},
        e.headers,
      )),
      yd.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function (i) {
          delete e.headers[i];
        },
      );
    var r = e.adapter || zS.adapter;
    return r(e).then(
      function (i) {
        return qa(e), (i.data = Ma.call(e, i.data, i.headers, e.transformResponse)), i;
      },
      function (i) {
        return (
          HS(i) ||
            (qa(e),
            i &&
              i.response &&
              (i.response.data = Ma.call(
                e,
                i.response.data,
                i.response.headers,
                e.transformResponse,
              ))),
          Promise.reject(i)
        );
      },
    );
  };
});
var Ba = E((lA, _d) => {
  'use strict';
  var Oe = Fe();
  _d.exports = function (e, r) {
    r = r || {};
    var n = {},
      i = ['url', 'method', 'data'],
      s = ['headers', 'auth', 'proxy', 'params'],
      o = [
        'baseURL',
        'transformRequest',
        'transformResponse',
        'paramsSerializer',
        'timeout',
        'timeoutMessage',
        'withCredentials',
        'adapter',
        'responseType',
        'xsrfCookieName',
        'xsrfHeaderName',
        'onUploadProgress',
        'onDownloadProgress',
        'decompress',
        'maxContentLength',
        'maxBodyLength',
        'maxRedirects',
        'transport',
        'httpAgent',
        'httpsAgent',
        'cancelToken',
        'socketPath',
        'responseEncoding',
      ],
      a = ['validateStatus'];
    function c(h, d) {
      return Oe.isPlainObject(h) && Oe.isPlainObject(d)
        ? Oe.merge(h, d)
        : Oe.isPlainObject(d)
        ? Oe.merge({}, d)
        : Oe.isArray(d)
        ? d.slice()
        : d;
    }
    function l(h) {
      Oe.isUndefined(r[h])
        ? Oe.isUndefined(e[h]) || (n[h] = c(void 0, e[h]))
        : (n[h] = c(e[h], r[h]));
    }
    Oe.forEach(i, function (d) {
      Oe.isUndefined(r[d]) || (n[d] = c(void 0, r[d]));
    }),
      Oe.forEach(s, l),
      Oe.forEach(o, function (d) {
        Oe.isUndefined(r[d])
          ? Oe.isUndefined(e[d]) || (n[d] = c(void 0, e[d]))
          : (n[d] = c(void 0, r[d]));
      }),
      Oe.forEach(a, function (d) {
        d in r ? (n[d] = c(e[d], r[d])) : d in e && (n[d] = c(void 0, e[d]));
      });
    var u = i.concat(s).concat(o).concat(a),
      f = Object.keys(e)
        .concat(Object.keys(r))
        .filter(function (d) {
          return u.indexOf(d) === -1;
        });
    return Oe.forEach(f, l), n;
  };
});
var Rd = E((fA, wd) => {
  'use strict';
  var vd = Pa(),
    ja = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (
    t,
    e,
  ) {
    ja[t] = function (n) {
      return typeof n === t || 'a' + (e < 1 ? 'n ' : ' ') + t;
    };
  });
  var bd = {},
    VS = vd.version.split('.');
  function Sd(t, e) {
    for (var r = e ? e.split('.') : VS, n = t.split('.'), i = 0; i < 3; i++) {
      if (r[i] > n[i]) return !0;
      if (r[i] < n[i]) return !1;
    }
    return !1;
  }
  ja.transitional = function (e, r, n) {
    var i = r && Sd(r);
    function s(o, a) {
      return (
        '[Axios v' +
        vd.version +
        "] Transitional option '" +
        o +
        "'" +
        a +
        (n ? '. ' + n : '')
      );
    }
    return function (o, a, c) {
      if (e === !1) throw new Error(s(a, ' has been removed in ' + r));
      return (
        i &&
          !bd[a] &&
          ((bd[a] = !0),
          console.warn(
            s(
              a,
              ' has been deprecated since v' +
                r +
                ' and will be removed in the near future',
            ),
          )),
        e ? e(o, a, c) : !0
      );
    };
  };
  function WS(t, e, r) {
    if (typeof t != 'object') throw new TypeError('options must be an object');
    for (var n = Object.keys(t), i = n.length; i-- > 0; ) {
      var s = n[i],
        o = e[s];
      if (o) {
        var a = t[s],
          c = a === void 0 || o(a, s, t);
        if (c !== !0) throw new TypeError('option ' + s + ' must be ' + c);
        continue;
      }
      if (r !== !0) throw Error('Unknown option ' + s);
    }
  }
  wd.exports = { isOlderVersion: Sd, assertOptions: WS, validators: ja };
});
var Nd = E((hA, Id) => {
  'use strict';
  var Td = Fe(),
    XS = Ki(),
    xd = gh(),
    Od = gd(),
    cs = Ba(),
    Cd = Rd(),
    rn = Cd.validators;
  function ri(t) {
    (this.defaults = t), (this.interceptors = { request: new xd(), response: new xd() });
  }
  ri.prototype.request = function (e) {
    typeof e == 'string'
      ? ((e = arguments[1] || {}), (e.url = arguments[0]))
      : (e = e || {}),
      (e = cs(this.defaults, e)),
      e.method
        ? (e.method = e.method.toLowerCase())
        : this.defaults.method
        ? (e.method = this.defaults.method.toLowerCase())
        : (e.method = 'get');
    var r = e.transitional;
    r !== void 0 &&
      Cd.assertOptions(
        r,
        {
          silentJSONParsing: rn.transitional(rn.boolean, '1.0.0'),
          forcedJSONParsing: rn.transitional(rn.boolean, '1.0.0'),
          clarifyTimeoutError: rn.transitional(rn.boolean, '1.0.0'),
        },
        !1,
      );
    var n = [],
      i = !0;
    this.interceptors.request.forEach(function (h) {
      (typeof h.runWhen == 'function' && h.runWhen(e) === !1) ||
        ((i = i && h.synchronous), n.unshift(h.fulfilled, h.rejected));
    });
    var s = [];
    this.interceptors.response.forEach(function (h) {
      s.push(h.fulfilled, h.rejected);
    });
    var o;
    if (!i) {
      var a = [Od, void 0];
      for (
        Array.prototype.unshift.apply(a, n), a.concat(s), o = Promise.resolve(e);
        a.length;

      )
        o = o.then(a.shift(), a.shift());
      return o;
    }
    for (var c = e; n.length; ) {
      var l = n.shift(),
        u = n.shift();
      try {
        c = l(c);
      } catch (f) {
        u(f);
        break;
      }
    }
    try {
      o = Od(c);
    } catch (f) {
      return Promise.reject(f);
    }
    for (; s.length; ) o = o.then(s.shift(), s.shift());
    return o;
  };
  ri.prototype.getUri = function (e) {
    return (
      (e = cs(this.defaults, e)),
      XS(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
    );
  };
  Td.forEach(['delete', 'get', 'head', 'options'], function (e) {
    ri.prototype[e] = function (r, n) {
      return this.request(cs(n || {}, { method: e, url: r, data: (n || {}).data }));
    };
  });
  Td.forEach(['post', 'put', 'patch'], function (e) {
    ri.prototype[e] = function (r, n, i) {
      return this.request(cs(i || {}, { method: e, url: r, data: n }));
    };
  });
  Id.exports = ri;
});
var $a = E((dA, Ad) => {
  'use strict';
  function Ga(t) {
    this.message = t;
  }
  Ga.prototype.toString = function () {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };
  Ga.prototype.__CANCEL__ = !0;
  Ad.exports = Ga;
});
var Ld = E((pA, Dd) => {
  'use strict';
  var KS = $a();
  function us(t) {
    if (typeof t != 'function') throw new TypeError('executor must be a function.');
    var e;
    this.promise = new Promise(function (i) {
      e = i;
    });
    var r = this;
    t(function (i) {
      r.reason || ((r.reason = new KS(i)), e(r.reason));
    });
  }
  us.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  };
  us.source = function () {
    var e,
      r = new us(function (i) {
        e = i;
      });
    return { token: r, cancel: e };
  };
  Dd.exports = us;
});
var Pd = E((mA, kd) => {
  'use strict';
  kd.exports = function (e) {
    return function (n) {
      return e.apply(null, n);
    };
  };
});
var Fd = E((yA, Ud) => {
  'use strict';
  Ud.exports = function (e) {
    return typeof e == 'object' && e.isAxiosError === !0;
  };
});
var Bd = E((EA, Ha) => {
  'use strict';
  var Md = Fe(),
    YS = pa(),
    ls = Nd(),
    JS = Ba(),
    ZS = as();
  function qd(t) {
    var e = new ls(t),
      r = YS(ls.prototype.request, e);
    return Md.extend(r, ls.prototype, e), Md.extend(r, e), r;
  }
  var lt = qd(ZS);
  lt.Axios = ls;
  lt.create = function (e) {
    return qd(JS(lt.defaults, e));
  };
  lt.Cancel = $a();
  lt.CancelToken = Ld();
  lt.isCancel = Fa();
  lt.all = function (e) {
    return Promise.all(e);
  };
  lt.spread = Pd();
  lt.isAxiosError = Fd();
  Ha.exports = lt;
  Ha.exports.default = lt;
});
var za = E((gA, jd) => {
  'use strict';
  jd.exports = Bd();
});
function Te(t, e = 1e4) {
  let r = (s) => s,
    n = process.env.NX_CLOUD_API || t.url || 'https://cloud.nx.app',
    i = At ? At : t.accessToken;
  if (!i)
    throw new Error(
      'Unable to authenticate. Either define accessToken in nx.json or set the NX_CLOUD_ACCESS_TOKEN env variable.',
    );
  if (t.customProxyConfigPath) {
    let { nxCloudProxyConfig: s } = require((0, $d.join)(
      process.cwd(),
      t.customProxyConfigPath,
    ));
    r = s ?? r;
  }
  return QS.create(
    r({
      baseURL: n,
      timeout: Et ? Xn : e,
      headers: {
        authorization: i,
        'Nx-Cloud-Client-Version': t.clientVersion || 'unknown',
      },
    }),
  );
}
async function Wa(t, e) {
  let r = new Date(),
    n = await e();
  return F && console.log(`${t}: ${new Date().getTime() - r.getTime()}`), n;
}
async function ce(t, e = zi) {
  try {
    return await t();
  } catch (r) {
    let n = (r.response && r.response.status) || r.code;
    (n === 401 || n === 403) && (e = 0);
    let i = r.response
      ? r.response.data.message
        ? r.response.data.message
        : r.response.data
      : r.message;
    if (e === 0)
      throw (
        (typeof i != 'string' && (i = r.message),
        new Va(
          'failure',
          `Error when connecting to Nx Cloud. Code: ${n}. Error: ${i}`,
          r,
        ))
      );
    if (n == 429) {
      if (!fs) {
        let s = 1e4 + (zi + 1 - e) * 6e4 * Math.random();
        Gd.note({ title: `Received Code ${n}. ${i} Retrying in ${s}ms.` }), (fs = tt(s));
      }
      await fs, (fs = null);
    } else {
      let s = 1e3 + (zi + 1 - e) * 4e3 * Math.random();
      F && Gd.note({ title: `Received Code ${n}. Retrying in ${s}ms.` }), await tt(s);
    }
    return ce(t, e - 1);
  }
}
var $d,
  Gd,
  QS,
  Va,
  fs,
  gt = q(() => {
    'use strict';
    $d = require('path');
    ie();
    Jn();
    ({ output: Gd } = Y()),
      (QS = za()),
      (Va = class {
        constructor(e, r, n) {
          this.type = e;
          this.message = r;
          this.axiosException = n;
        }
      });
    fs = null;
  });
function Xt(t) {
  ew()
    ? (process.stdout.write(`   ${Xa(t)}`), _t.addNewline(), _t.addNewline())
    : tw()
    ? (_t.addNewline(),
      process.stdout.write(`${Xa(t)}`),
      _t.addNewline(),
      _t.addNewline())
    : (process.stdout.write(`  ${Xa(t)}`), _t.addNewline(), _t.addNewline());
}
function ew() {
  try {
    return (
      ne('nx/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle'),
      !0
    );
  } catch {
    try {
      return (
        ne(
          '@nrwl/workspace/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle',
        ),
        !0
      );
    } catch {
      return !1;
    }
  }
}
function Xa(t) {
  let e;
  if (typeof _t.dim == 'function') return _t.dim(t);
  try {
    return _t.colors.gray(t);
  } catch {
    return t;
  }
}
function tw() {
  return (
    process.argv.indexOf('run-many') === -1 && process.argv.indexOf('affected') === -1
  );
}
var _t,
  ni = q(() => {
    'use strict';
    Sr();
    ({ output: _t } = Y());
  });
var Ka,
  Hd,
  Ce,
  re,
  Ie,
  rw,
  nw,
  nn,
  Dt = q(() => {
    'use strict';
    Ka = require('perf_hooks');
    gt();
    ie();
    ni();
    (Hd = []),
      (Ce = (t) => {
        let e = Ka.performance.now();
        return {
          recordMetric: (n) => {
            let i = Ka.performance.now();
            (n.durationMs = i - e), (n.entryType = t), Hd.push(n);
          },
        };
      }),
      (re = (t) => {
        var e;
        return {
          success:
            ((e = t == null ? void 0 : t.status) == null
              ? void 0
              : e.toString().startsWith('2')) ?? !1,
          statusCode: (t == null ? void 0 : t.status) ?? -1,
        };
      }),
      (Ie = { success: !1, statusCode: -1 }),
      (rw = 0.1),
      (nw = 0.01),
      (nn = (t) => {
        let e;
        me() ? (e = rw) : (e = nw);
        try {
          return ah || Math.random() < e
            ? (F && Xt('Submitting runner metrics for this run.'),
              Te(t)
                .post('/nx-cloud/save-metrics', { entries: Hd })
                .catch((n) => {}))
            : Promise.resolve();
        } catch {}
      });
  });
function hs(t) {
  return t[t.length - 1] === '/' ? t.substr(0, t.length - 1) : t;
}
var Ya = q(() => {
  'use strict';
});
var iw,
  Kt,
  ds = q(() => {
    'use strict';
    gt();
    ({ output: iw } = Y()),
      (Kt = class {
        constructor(e) {
          this.apiAxiosInstance = Te(e);
        }
        async reportError(e) {
          try {
            await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/report-client-error', { message: e }),
            );
          } catch (r) {
            iw.warn({
              title: `Unable to record the following error: '${e}'`,
              bodyLines: [r.message],
            });
          }
        }
      });
  });
var on,
  sn,
  Yt,
  ps = q(() => {
    'use strict';
    (on = require('crypto')),
      (sn = require('fs')),
      (Yt = class {
        constructor(e) {
          e && (this.encryptionKey = this.to32bytes(e));
        }
        to32bytes(e) {
          let r = e;
          for (; r.length < 32; ) r += e;
          return Buffer.from(r).slice(0, 32);
        }
        hasEncryption() {
          return !!this.encryptionKey;
        }
        encryptFile(e) {
          let r = (0, on.randomBytes)(16),
            n = (0, on.createCipheriv)('aes-256-cbc', this.encryptionKey, r),
            i = (0, sn.readFileSync)(e),
            s = n.update(i),
            o = Buffer.concat([r, s, n.final()]);
          (0, sn.writeFileSync)(e, o);
        }
        decryptFile(e) {
          let r = (0, sn.readFileSync)(e);
          try {
            let n = (0, on.createDecipheriv)(
                'aes-256-cbc',
                this.encryptionKey,
                r.slice(0, 16),
              ),
              i = r.slice(16),
              s = n.update(i),
              o = Buffer.concat([s, n.final()]);
            (0, sn.writeFileSync)(e, o);
          } catch {
            throw new Error(
              'Could not decrypt the artifact. Please check your encryption key.',
            );
          }
        }
      });
  });
var an = E((DA, Vd) => {
  'use strict';
  var zd = new Map([
    ['C', 'cwd'],
    ['f', 'file'],
    ['z', 'gzip'],
    ['P', 'preservePaths'],
    ['U', 'unlink'],
    ['strip-components', 'strip'],
    ['stripComponents', 'strip'],
    ['keep-newer', 'newer'],
    ['keepNewer', 'newer'],
    ['keep-newer-files', 'newer'],
    ['keepNewerFiles', 'newer'],
    ['k', 'keep'],
    ['keep-existing', 'keep'],
    ['keepExisting', 'keep'],
    ['m', 'noMtime'],
    ['no-mtime', 'noMtime'],
    ['p', 'preserveOwner'],
    ['L', 'follow'],
    ['h', 'follow'],
  ]);
  Vd.exports = (t) =>
    t
      ? Object.keys(t)
          .map((e) => [zd.has(e) ? zd.get(e) : e, t[e]])
          .reduce((e, r) => ((e[r[0]] = r[1]), e), Object.create(null))
      : {};
});
var un = E((LA, tp) => {
  'use strict';
  var Wd =
      typeof process == 'object' && process ? process : { stdout: null, stderr: null },
    sw = require('events'),
    Xd = require('stream'),
    Kd = require('string_decoder').StringDecoder,
    Lt = Symbol('EOF'),
    kt = Symbol('maybeEmitEnd'),
    Jt = Symbol('emittedEnd'),
    ms = Symbol('emittingEnd'),
    ii = Symbol('emittedError'),
    ys = Symbol('closed'),
    Yd = Symbol('read'),
    Es = Symbol('flush'),
    Jd = Symbol('flushChunk'),
    $e = Symbol('encoding'),
    Pt = Symbol('decoder'),
    gs = Symbol('flowing'),
    si = Symbol('paused'),
    cn = Symbol('resume'),
    Ee = Symbol('bufferLength'),
    Ja = Symbol('bufferPush'),
    Za = Symbol('bufferShift'),
    Ne = Symbol('objectMode'),
    Ae = Symbol('destroyed'),
    Qa = Symbol('emitData'),
    Zd = Symbol('emitEnd'),
    ec = Symbol('emitEnd2'),
    Ut = Symbol('async'),
    oi = (t) => Promise.resolve().then(t),
    Qd = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
    ow = (Qd && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
    aw = (Qd && Symbol.iterator) || Symbol('iterator not implemented'),
    cw = (t) => t === 'end' || t === 'finish' || t === 'prefinish',
    uw = (t) =>
      t instanceof ArrayBuffer ||
      (typeof t == 'object' &&
        t.constructor &&
        t.constructor.name === 'ArrayBuffer' &&
        t.byteLength >= 0),
    lw = (t) => !Buffer.isBuffer(t) && ArrayBuffer.isView(t),
    _s = class {
      constructor(e, r, n) {
        (this.src = e),
          (this.dest = r),
          (this.opts = n),
          (this.ondrain = () => e[cn]()),
          r.on('drain', this.ondrain);
      }
      unpipe() {
        this.dest.removeListener('drain', this.ondrain);
      }
      proxyErrors() {}
      end() {
        this.unpipe(), this.opts.end && this.dest.end();
      }
    },
    tc = class extends _s {
      unpipe() {
        this.src.removeListener('error', this.proxyErrors), super.unpipe();
      }
      constructor(e, r, n) {
        super(e, r, n),
          (this.proxyErrors = (i) => r.emit('error', i)),
          e.on('error', this.proxyErrors);
      }
    };
  tp.exports = class ep extends Xd {
    constructor(e) {
      super(),
        (this[gs] = !1),
        (this[si] = !1),
        (this.pipes = []),
        (this.buffer = []),
        (this[Ne] = (e && e.objectMode) || !1),
        this[Ne] ? (this[$e] = null) : (this[$e] = (e && e.encoding) || null),
        this[$e] === 'buffer' && (this[$e] = null),
        (this[Ut] = (e && !!e.async) || !1),
        (this[Pt] = this[$e] ? new Kd(this[$e]) : null),
        (this[Lt] = !1),
        (this[Jt] = !1),
        (this[ms] = !1),
        (this[ys] = !1),
        (this[ii] = null),
        (this.writable = !0),
        (this.readable = !0),
        (this[Ee] = 0),
        (this[Ae] = !1);
    }
    get bufferLength() {
      return this[Ee];
    }
    get encoding() {
      return this[$e];
    }
    set encoding(e) {
      if (this[Ne]) throw new Error('cannot set encoding in objectMode');
      if (this[$e] && e !== this[$e] && ((this[Pt] && this[Pt].lastNeed) || this[Ee]))
        throw new Error('cannot change encoding');
      this[$e] !== e &&
        ((this[Pt] = e ? new Kd(e) : null),
        this.buffer.length && (this.buffer = this.buffer.map((r) => this[Pt].write(r)))),
        (this[$e] = e);
    }
    setEncoding(e) {
      this.encoding = e;
    }
    get objectMode() {
      return this[Ne];
    }
    set objectMode(e) {
      this[Ne] = this[Ne] || !!e;
    }
    get async() {
      return this[Ut];
    }
    set async(e) {
      this[Ut] = this[Ut] || !!e;
    }
    write(e, r, n) {
      if (this[Lt]) throw new Error('write after end');
      if (this[Ae])
        return (
          this.emit(
            'error',
            Object.assign(new Error('Cannot call write after a stream was destroyed'), {
              code: 'ERR_STREAM_DESTROYED',
            }),
          ),
          !0
        );
      typeof r == 'function' && ((n = r), (r = 'utf8')), r || (r = 'utf8');
      let i = this[Ut] ? oi : (s) => s();
      return (
        !this[Ne] &&
          !Buffer.isBuffer(e) &&
          (lw(e)
            ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
            : uw(e)
            ? (e = Buffer.from(e))
            : typeof e != 'string' && (this.objectMode = !0)),
        this[Ne]
          ? (this.flowing && this[Ee] !== 0 && this[Es](!0),
            this.flowing ? this.emit('data', e) : this[Ja](e),
            this[Ee] !== 0 && this.emit('readable'),
            n && i(n),
            this.flowing)
          : e.length
          ? (typeof e == 'string' &&
              !(r === this[$e] && !this[Pt].lastNeed) &&
              (e = Buffer.from(e, r)),
            Buffer.isBuffer(e) && this[$e] && (e = this[Pt].write(e)),
            this.flowing && this[Ee] !== 0 && this[Es](!0),
            this.flowing ? this.emit('data', e) : this[Ja](e),
            this[Ee] !== 0 && this.emit('readable'),
            n && i(n),
            this.flowing)
          : (this[Ee] !== 0 && this.emit('readable'), n && i(n), this.flowing)
      );
    }
    read(e) {
      if (this[Ae]) return null;
      if (this[Ee] === 0 || e === 0 || e > this[Ee]) return this[kt](), null;
      this[Ne] && (e = null),
        this.buffer.length > 1 &&
          !this[Ne] &&
          (this.encoding
            ? (this.buffer = [this.buffer.join('')])
            : (this.buffer = [Buffer.concat(this.buffer, this[Ee])]));
      let r = this[Yd](e || null, this.buffer[0]);
      return this[kt](), r;
    }
    [Yd](e, r) {
      return (
        e === r.length || e === null
          ? this[Za]()
          : ((this.buffer[0] = r.slice(e)), (r = r.slice(0, e)), (this[Ee] -= e)),
        this.emit('data', r),
        !this.buffer.length && !this[Lt] && this.emit('drain'),
        r
      );
    }
    end(e, r, n) {
      return (
        typeof e == 'function' && ((n = e), (e = null)),
        typeof r == 'function' && ((n = r), (r = 'utf8')),
        e && this.write(e, r),
        n && this.once('end', n),
        (this[Lt] = !0),
        (this.writable = !1),
        (this.flowing || !this[si]) && this[kt](),
        this
      );
    }
    [cn]() {
      this[Ae] ||
        ((this[si] = !1),
        (this[gs] = !0),
        this.emit('resume'),
        this.buffer.length ? this[Es]() : this[Lt] ? this[kt]() : this.emit('drain'));
    }
    resume() {
      return this[cn]();
    }
    pause() {
      (this[gs] = !1), (this[si] = !0);
    }
    get destroyed() {
      return this[Ae];
    }
    get flowing() {
      return this[gs];
    }
    get paused() {
      return this[si];
    }
    [Ja](e) {
      this[Ne] ? (this[Ee] += 1) : (this[Ee] += e.length), this.buffer.push(e);
    }
    [Za]() {
      return (
        this.buffer.length &&
          (this[Ne] ? (this[Ee] -= 1) : (this[Ee] -= this.buffer[0].length)),
        this.buffer.shift()
      );
    }
    [Es](e) {
      do;
      while (this[Jd](this[Za]()));
      !e && !this.buffer.length && !this[Lt] && this.emit('drain');
    }
    [Jd](e) {
      return e ? (this.emit('data', e), this.flowing) : !1;
    }
    pipe(e, r) {
      if (this[Ae]) return;
      let n = this[Jt];
      return (
        (r = r || {}),
        e === Wd.stdout || e === Wd.stderr ? (r.end = !1) : (r.end = r.end !== !1),
        (r.proxyErrors = !!r.proxyErrors),
        n
          ? r.end && e.end()
          : (this.pipes.push(r.proxyErrors ? new tc(this, e, r) : new _s(this, e, r)),
            this[Ut] ? oi(() => this[cn]()) : this[cn]()),
        e
      );
    }
    unpipe(e) {
      let r = this.pipes.find((n) => n.dest === e);
      r && (this.pipes.splice(this.pipes.indexOf(r), 1), r.unpipe());
    }
    addListener(e, r) {
      return this.on(e, r);
    }
    on(e, r) {
      let n = super.on(e, r);
      return (
        e === 'data' && !this.pipes.length && !this.flowing
          ? this[cn]()
          : e === 'readable' && this[Ee] !== 0
          ? super.emit('readable')
          : cw(e) && this[Jt]
          ? (super.emit(e), this.removeAllListeners(e))
          : e === 'error' &&
            this[ii] &&
            (this[Ut] ? oi(() => r.call(this, this[ii])) : r.call(this, this[ii])),
        n
      );
    }
    get emittedEnd() {
      return this[Jt];
    }
    [kt]() {
      !this[ms] &&
        !this[Jt] &&
        !this[Ae] &&
        this.buffer.length === 0 &&
        this[Lt] &&
        ((this[ms] = !0),
        this.emit('end'),
        this.emit('prefinish'),
        this.emit('finish'),
        this[ys] && this.emit('close'),
        (this[ms] = !1));
    }
    emit(e, r, ...n) {
      if (e !== 'error' && e !== 'close' && e !== Ae && this[Ae]) return;
      if (e === 'data') return r ? (this[Ut] ? oi(() => this[Qa](r)) : this[Qa](r)) : !1;
      if (e === 'end') return this[Zd]();
      if (e === 'close') {
        if (((this[ys] = !0), !this[Jt] && !this[Ae])) return;
        let s = super.emit('close');
        return this.removeAllListeners('close'), s;
      } else if (e === 'error') {
        this[ii] = r;
        let s = super.emit('error', r);
        return this[kt](), s;
      } else if (e === 'resume') {
        let s = super.emit('resume');
        return this[kt](), s;
      } else if (e === 'finish' || e === 'prefinish') {
        let s = super.emit(e);
        return this.removeAllListeners(e), s;
      }
      let i = super.emit(e, r, ...n);
      return this[kt](), i;
    }
    [Qa](e) {
      for (let n of this.pipes) n.dest.write(e) === !1 && this.pause();
      let r = super.emit('data', e);
      return this[kt](), r;
    }
    [Zd]() {
      this[Jt] ||
        ((this[Jt] = !0),
        (this.readable = !1),
        this[Ut] ? oi(() => this[ec]()) : this[ec]());
    }
    [ec]() {
      if (this[Pt]) {
        let r = this[Pt].end();
        if (r) {
          for (let n of this.pipes) n.dest.write(r);
          super.emit('data', r);
        }
      }
      for (let r of this.pipes) r.end();
      let e = super.emit('end');
      return this.removeAllListeners('end'), e;
    }
    collect() {
      let e = [];
      this[Ne] || (e.dataLength = 0);
      let r = this.promise();
      return (
        this.on('data', (n) => {
          e.push(n), this[Ne] || (e.dataLength += n.length);
        }),
        r.then(() => e)
      );
    }
    concat() {
      return this[Ne]
        ? Promise.reject(new Error('cannot concat in objectMode'))
        : this.collect().then((e) =>
            this[Ne]
              ? Promise.reject(new Error('cannot concat in objectMode'))
              : this[$e]
              ? e.join('')
              : Buffer.concat(e, e.dataLength),
          );
    }
    promise() {
      return new Promise((e, r) => {
        this.on(Ae, () => r(new Error('stream destroyed'))),
          this.on('error', (n) => r(n)),
          this.on('end', () => e());
      });
    }
    [ow]() {
      return {
        next: () => {
          let r = this.read();
          if (r !== null) return Promise.resolve({ done: !1, value: r });
          if (this[Lt]) return Promise.resolve({ done: !0 });
          let n = null,
            i = null,
            s = (l) => {
              this.removeListener('data', o), this.removeListener('end', a), i(l);
            },
            o = (l) => {
              this.removeListener('error', s),
                this.removeListener('end', a),
                this.pause(),
                n({ value: l, done: !!this[Lt] });
            },
            a = () => {
              this.removeListener('error', s),
                this.removeListener('data', o),
                n({ done: !0 });
            },
            c = () => s(new Error('stream destroyed'));
          return new Promise((l, u) => {
            (i = u),
              (n = l),
              this.once(Ae, c),
              this.once('error', s),
              this.once('end', a),
              this.once('data', o);
          });
        },
      };
    }
    [aw]() {
      return {
        next: () => {
          let r = this.read();
          return { value: r, done: r === null };
        },
      };
    }
    destroy(e) {
      return this[Ae]
        ? (e ? this.emit('error', e) : this.emit(Ae), this)
        : ((this[Ae] = !0),
          (this.buffer.length = 0),
          (this[Ee] = 0),
          typeof this.close == 'function' && !this[ys] && this.close(),
          e ? this.emit('error', e) : this.emit(Ae),
          this);
    }
    static isStream(e) {
      return (
        !!e &&
        (e instanceof ep ||
          e instanceof Xd ||
          (e instanceof sw &&
            (typeof e.pipe == 'function' ||
              (typeof e.write == 'function' && typeof e.end == 'function'))))
      );
    }
  };
});
var np = E((kA, rp) => {
  'use strict';
  var fw = require('zlib').constants || { ZLIB_VERNUM: 4736 };
  rp.exports = Object.freeze(
    Object.assign(
      Object.create(null),
      {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_VERSION_ERROR: -6,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        DEFLATE: 1,
        INFLATE: 2,
        GZIP: 3,
        GUNZIP: 4,
        DEFLATERAW: 5,
        INFLATERAW: 6,
        UNZIP: 7,
        BROTLI_DECODE: 8,
        BROTLI_ENCODE: 9,
        Z_MIN_WINDOWBITS: 8,
        Z_MAX_WINDOWBITS: 15,
        Z_DEFAULT_WINDOWBITS: 15,
        Z_MIN_CHUNK: 64,
        Z_MAX_CHUNK: 1 / 0,
        Z_DEFAULT_CHUNK: 16384,
        Z_MIN_MEMLEVEL: 1,
        Z_MAX_MEMLEVEL: 9,
        Z_DEFAULT_MEMLEVEL: 8,
        Z_MIN_LEVEL: -1,
        Z_MAX_LEVEL: 9,
        Z_DEFAULT_LEVEL: -1,
        BROTLI_OPERATION_PROCESS: 0,
        BROTLI_OPERATION_FLUSH: 1,
        BROTLI_OPERATION_FINISH: 2,
        BROTLI_OPERATION_EMIT_METADATA: 3,
        BROTLI_MODE_GENERIC: 0,
        BROTLI_MODE_TEXT: 1,
        BROTLI_MODE_FONT: 2,
        BROTLI_DEFAULT_MODE: 0,
        BROTLI_MIN_QUALITY: 0,
        BROTLI_MAX_QUALITY: 11,
        BROTLI_DEFAULT_QUALITY: 11,
        BROTLI_MIN_WINDOW_BITS: 10,
        BROTLI_MAX_WINDOW_BITS: 24,
        BROTLI_LARGE_MAX_WINDOW_BITS: 30,
        BROTLI_DEFAULT_WINDOW: 22,
        BROTLI_MIN_INPUT_BLOCK_BITS: 16,
        BROTLI_MAX_INPUT_BLOCK_BITS: 24,
        BROTLI_PARAM_MODE: 0,
        BROTLI_PARAM_QUALITY: 1,
        BROTLI_PARAM_LGWIN: 2,
        BROTLI_PARAM_LGBLOCK: 3,
        BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
        BROTLI_PARAM_SIZE_HINT: 5,
        BROTLI_PARAM_LARGE_WINDOW: 6,
        BROTLI_PARAM_NPOSTFIX: 7,
        BROTLI_PARAM_NDIRECT: 8,
        BROTLI_DECODER_RESULT_ERROR: 0,
        BROTLI_DECODER_RESULT_SUCCESS: 1,
        BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
        BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
        BROTLI_DECODER_NO_ERROR: 0,
        BROTLI_DECODER_SUCCESS: 1,
        BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
        BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
        BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
        BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
        BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
        BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
        BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
        BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
        BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
        BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
        BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
        BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
        BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
        BROTLI_DECODER_ERROR_UNREACHABLE: -31,
      },
      fw,
    ),
  );
});
var Ec = E((Ke) => {
  'use strict';
  var oc = require('assert'),
    Zt = require('buffer').Buffer,
    op = require('zlib'),
    Ir = (Ke.constants = np()),
    hw = un(),
    ip = Zt.concat,
    Nr = Symbol('_superWrite'),
    fn = class extends Error {
      constructor(e) {
        super('zlib: ' + e.message),
          (this.code = e.code),
          (this.errno = e.errno),
          this.code || (this.code = 'ZLIB_ERROR'),
          (this.message = 'zlib: ' + e.message),
          Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return 'ZlibError';
      }
    },
    dw = Symbol('opts'),
    ai = Symbol('flushFlag'),
    sp = Symbol('finishFlushFlag'),
    yc = Symbol('fullFlushFlag'),
    se = Symbol('handle'),
    bs = Symbol('onError'),
    ln = Symbol('sawError'),
    rc = Symbol('level'),
    nc = Symbol('strategy'),
    ic = Symbol('ended'),
    PA = Symbol('_defaultFullFlush'),
    vs = class extends hw {
      constructor(e, r) {
        if (!e || typeof e != 'object')
          throw new TypeError('invalid options for ZlibBase constructor');
        super(e),
          (this[ln] = !1),
          (this[ic] = !1),
          (this[dw] = e),
          (this[ai] = e.flush),
          (this[sp] = e.finishFlush);
        try {
          this[se] = new op[r](e);
        } catch (n) {
          throw new fn(n);
        }
        (this[bs] = (n) => {
          this[ln] || ((this[ln] = !0), this.close(), this.emit('error', n));
        }),
          this[se].on('error', (n) => this[bs](new fn(n))),
          this.once('end', () => this.close);
      }
      close() {
        this[se] && (this[se].close(), (this[se] = null), this.emit('close'));
      }
      reset() {
        if (!this[ln]) return oc(this[se], 'zlib binding closed'), this[se].reset();
      }
      flush(e) {
        this.ended ||
          (typeof e != 'number' && (e = this[yc]),
          this.write(Object.assign(Zt.alloc(0), { [ai]: e })));
      }
      end(e, r, n) {
        return (
          e && this.write(e, r),
          this.flush(this[sp]),
          (this[ic] = !0),
          super.end(null, null, n)
        );
      }
      get ended() {
        return this[ic];
      }
      write(e, r, n) {
        if (
          (typeof r == 'function' && ((n = r), (r = 'utf8')),
          typeof e == 'string' && (e = Zt.from(e, r)),
          this[ln])
        )
          return;
        oc(this[se], 'zlib binding closed');
        let i = this[se]._handle,
          s = i.close;
        i.close = () => {};
        let o = this[se].close;
        (this[se].close = () => {}), (Zt.concat = (l) => l);
        let a;
        try {
          let l = typeof e[ai] == 'number' ? e[ai] : this[ai];
          (a = this[se]._processChunk(e, l)), (Zt.concat = ip);
        } catch (l) {
          (Zt.concat = ip), this[bs](new fn(l));
        } finally {
          this[se] &&
            ((this[se]._handle = i),
            (i.close = s),
            (this[se].close = o),
            this[se].removeAllListeners('error'));
        }
        this[se] && this[se].on('error', (l) => this[bs](new fn(l)));
        let c;
        if (a)
          if (Array.isArray(a) && a.length > 0) {
            c = this[Nr](Zt.from(a[0]));
            for (let l = 1; l < a.length; l++) c = this[Nr](a[l]);
          } else c = this[Nr](Zt.from(a));
        return n && n(), c;
      }
      [Nr](e) {
        return super.write(e);
      }
    },
    Ft = class extends vs {
      constructor(e, r) {
        (e = e || {}),
          (e.flush = e.flush || Ir.Z_NO_FLUSH),
          (e.finishFlush = e.finishFlush || Ir.Z_FINISH),
          super(e, r),
          (this[yc] = Ir.Z_FULL_FLUSH),
          (this[rc] = e.level),
          (this[nc] = e.strategy);
      }
      params(e, r) {
        if (!this[ln]) {
          if (!this[se]) throw new Error('cannot switch params when binding is closed');
          if (!this[se].params) throw new Error('not supported in this implementation');
          if (this[rc] !== e || this[nc] !== r) {
            this.flush(Ir.Z_SYNC_FLUSH), oc(this[se], 'zlib binding closed');
            let n = this[se].flush;
            this[se].flush = (i, s) => {
              this.flush(i), s();
            };
            try {
              this[se].params(e, r);
            } finally {
              this[se].flush = n;
            }
            this[se] && ((this[rc] = e), (this[nc] = r));
          }
        }
      }
    },
    ac = class extends Ft {
      constructor(e) {
        super(e, 'Deflate');
      }
    },
    cc = class extends Ft {
      constructor(e) {
        super(e, 'Inflate');
      }
    },
    sc = Symbol('_portable'),
    uc = class extends Ft {
      constructor(e) {
        super(e, 'Gzip'), (this[sc] = e && !!e.portable);
      }
      [Nr](e) {
        return this[sc] ? ((this[sc] = !1), (e[9] = 255), super[Nr](e)) : super[Nr](e);
      }
    },
    lc = class extends Ft {
      constructor(e) {
        super(e, 'Gunzip');
      }
    },
    fc = class extends Ft {
      constructor(e) {
        super(e, 'DeflateRaw');
      }
    },
    hc = class extends Ft {
      constructor(e) {
        super(e, 'InflateRaw');
      }
    },
    dc = class extends Ft {
      constructor(e) {
        super(e, 'Unzip');
      }
    },
    Ss = class extends vs {
      constructor(e, r) {
        (e = e || {}),
          (e.flush = e.flush || Ir.BROTLI_OPERATION_PROCESS),
          (e.finishFlush = e.finishFlush || Ir.BROTLI_OPERATION_FINISH),
          super(e, r),
          (this[yc] = Ir.BROTLI_OPERATION_FLUSH);
      }
    },
    pc = class extends Ss {
      constructor(e) {
        super(e, 'BrotliCompress');
      }
    },
    mc = class extends Ss {
      constructor(e) {
        super(e, 'BrotliDecompress');
      }
    };
  Ke.Deflate = ac;
  Ke.Inflate = cc;
  Ke.Gzip = uc;
  Ke.Gunzip = lc;
  Ke.DeflateRaw = fc;
  Ke.InflateRaw = hc;
  Ke.Unzip = dc;
  typeof op.BrotliCompress == 'function'
    ? ((Ke.BrotliCompress = pc), (Ke.BrotliDecompress = mc))
    : (Ke.BrotliCompress = Ke.BrotliDecompress =
        class {
          constructor() {
            throw new Error('Brotli is not supported in this version of Node.js');
          }
        });
});
var hn = E((MA, ap) => {
  'use strict';
  var pw = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
  ap.exports = pw !== 'win32' ? (t) => t : (t) => t && t.replace(/\\/g, '/');
});
var ws = E((BA, cp) => {
  'use strict';
  var mw = un(),
    gc = hn(),
    _c = Symbol('slurp');
  cp.exports = class extends mw {
    constructor(e, r, n) {
      switch (
        (super(),
        this.pause(),
        (this.extended = r),
        (this.globalExtended = n),
        (this.header = e),
        (this.startBlockSize = 512 * Math.ceil(e.size / 512)),
        (this.blockRemain = this.startBlockSize),
        (this.remain = e.size),
        (this.type = e.type),
        (this.meta = !1),
        (this.ignore = !1),
        this.type)
      ) {
        case 'File':
        case 'OldFile':
        case 'Link':
        case 'SymbolicLink':
        case 'CharacterDevice':
        case 'BlockDevice':
        case 'Directory':
        case 'FIFO':
        case 'ContiguousFile':
        case 'GNUDumpDir':
          break;
        case 'NextFileHasLongLinkpath':
        case 'NextFileHasLongPath':
        case 'OldGnuLongPath':
        case 'GlobalExtendedHeader':
        case 'ExtendedHeader':
        case 'OldExtendedHeader':
          this.meta = !0;
          break;
        default:
          this.ignore = !0;
      }
      (this.path = gc(e.path)),
        (this.mode = e.mode),
        this.mode && (this.mode = this.mode & 4095),
        (this.uid = e.uid),
        (this.gid = e.gid),
        (this.uname = e.uname),
        (this.gname = e.gname),
        (this.size = e.size),
        (this.mtime = e.mtime),
        (this.atime = e.atime),
        (this.ctime = e.ctime),
        (this.linkpath = gc(e.linkpath)),
        (this.uname = e.uname),
        (this.gname = e.gname),
        r && this[_c](r),
        n && this[_c](n, !0);
    }
    write(e) {
      let r = e.length;
      if (r > this.blockRemain)
        throw new Error('writing more to entry than is appropriate');
      let n = this.remain,
        i = this.blockRemain;
      return (
        (this.remain = Math.max(0, n - r)),
        (this.blockRemain = Math.max(0, i - r)),
        this.ignore ? !0 : n >= r ? super.write(e) : super.write(e.slice(0, n))
      );
    }
    [_c](e, r) {
      for (let n in e)
        e[n] !== null &&
          e[n] !== void 0 &&
          !(r && n === 'path') &&
          (this[n] = n === 'path' || n === 'linkpath' ? gc(e[n]) : e[n]);
    }
  };
});
var bc = E((Rs) => {
  'use strict';
  Rs.name = new Map([
    ['0', 'File'],
    ['', 'OldFile'],
    ['1', 'Link'],
    ['2', 'SymbolicLink'],
    ['3', 'CharacterDevice'],
    ['4', 'BlockDevice'],
    ['5', 'Directory'],
    ['6', 'FIFO'],
    ['7', 'ContiguousFile'],
    ['g', 'GlobalExtendedHeader'],
    ['x', 'ExtendedHeader'],
    ['A', 'SolarisACL'],
    ['D', 'GNUDumpDir'],
    ['I', 'Inode'],
    ['K', 'NextFileHasLongLinkpath'],
    ['L', 'NextFileHasLongPath'],
    ['M', 'ContinuationFile'],
    ['N', 'OldGnuLongPath'],
    ['S', 'SparseFile'],
    ['V', 'TapeVolumeHeader'],
    ['X', 'OldExtendedHeader'],
  ]);
  Rs.code = new Map(Array.from(Rs.name).map((t) => [t[1], t[0]]));
});
var hp = E((GA, fp) => {
  'use strict';
  var yw = (t, e) => {
      if (Number.isSafeInteger(t)) t < 0 ? gw(t, e) : Ew(t, e);
      else throw Error('cannot encode number outside of javascript safe integer range');
      return e;
    },
    Ew = (t, e) => {
      e[0] = 128;
      for (var r = e.length; r > 1; r--) (e[r - 1] = t & 255), (t = Math.floor(t / 256));
    },
    gw = (t, e) => {
      e[0] = 255;
      var r = !1;
      t = t * -1;
      for (var n = e.length; n > 1; n--) {
        var i = t & 255;
        (t = Math.floor(t / 256)),
          r
            ? (e[n - 1] = up(i))
            : i === 0
            ? (e[n - 1] = 0)
            : ((r = !0), (e[n - 1] = lp(i)));
      }
    },
    _w = (t) => {
      let e = t[0],
        r = e === 128 ? vw(t.slice(1, t.length)) : e === 255 ? bw(t) : null;
      if (r === null) throw Error('invalid base256 encoding');
      if (!Number.isSafeInteger(r))
        throw Error('parsed number outside of javascript safe integer range');
      return r;
    },
    bw = (t) => {
      for (var e = t.length, r = 0, n = !1, i = e - 1; i > -1; i--) {
        var s = t[i],
          o;
        n ? (o = up(s)) : s === 0 ? (o = s) : ((n = !0), (o = lp(s))),
          o !== 0 && (r -= o * Math.pow(256, e - i - 1));
      }
      return r;
    },
    vw = (t) => {
      for (var e = t.length, r = 0, n = e - 1; n > -1; n--) {
        var i = t[n];
        i !== 0 && (r += i * Math.pow(256, e - n - 1));
      }
      return r;
    },
    up = (t) => (255 ^ t) & 255,
    lp = (t) => ((255 ^ t) + 1) & 255;
  fp.exports = { encode: yw, parse: _w };
});
var pn = E(($A, pp) => {
  'use strict';
  var vc = bc(),
    dn = require('path').posix,
    dp = hp(),
    Sc = Symbol('slurp'),
    Ye = Symbol('type'),
    xc = class {
      constructor(e, r, n, i) {
        (this.cksumValid = !1),
          (this.needPax = !1),
          (this.nullBlock = !1),
          (this.block = null),
          (this.path = null),
          (this.mode = null),
          (this.uid = null),
          (this.gid = null),
          (this.size = null),
          (this.mtime = null),
          (this.cksum = null),
          (this[Ye] = '0'),
          (this.linkpath = null),
          (this.uname = null),
          (this.gname = null),
          (this.devmaj = 0),
          (this.devmin = 0),
          (this.atime = null),
          (this.ctime = null),
          Buffer.isBuffer(e) ? this.decode(e, r || 0, n, i) : e && this.set(e);
      }
      decode(e, r, n, i) {
        if ((r || (r = 0), !e || !(e.length >= r + 512)))
          throw new Error('need 512 bytes for header');
        if (
          ((this.path = Ar(e, r, 100)),
          (this.mode = Qt(e, r + 100, 8)),
          (this.uid = Qt(e, r + 108, 8)),
          (this.gid = Qt(e, r + 116, 8)),
          (this.size = Qt(e, r + 124, 12)),
          (this.mtime = wc(e, r + 136, 12)),
          (this.cksum = Qt(e, r + 148, 12)),
          this[Sc](n),
          this[Sc](i, !0),
          (this[Ye] = Ar(e, r + 156, 1)),
          this[Ye] === '' && (this[Ye] = '0'),
          this[Ye] === '0' && this.path.substr(-1) === '/' && (this[Ye] = '5'),
          this[Ye] === '5' && (this.size = 0),
          (this.linkpath = Ar(e, r + 157, 100)),
          e.slice(r + 257, r + 265).toString() === 'ustar\x0000')
        )
          if (
            ((this.uname = Ar(e, r + 265, 32)),
            (this.gname = Ar(e, r + 297, 32)),
            (this.devmaj = Qt(e, r + 329, 8)),
            (this.devmin = Qt(e, r + 337, 8)),
            e[r + 475] !== 0)
          ) {
            let o = Ar(e, r + 345, 155);
            this.path = o + '/' + this.path;
          } else {
            let o = Ar(e, r + 345, 130);
            o && (this.path = o + '/' + this.path),
              (this.atime = wc(e, r + 476, 12)),
              (this.ctime = wc(e, r + 488, 12));
          }
        let s = 8 * 32;
        for (let o = r; o < r + 148; o++) s += e[o];
        for (let o = r + 156; o < r + 512; o++) s += e[o];
        (this.cksumValid = s === this.cksum),
          this.cksum === null && s === 8 * 32 && (this.nullBlock = !0);
      }
      [Sc](e, r) {
        for (let n in e)
          e[n] !== null && e[n] !== void 0 && !(r && n === 'path') && (this[n] = e[n]);
      }
      encode(e, r) {
        if (
          (e || ((e = this.block = Buffer.alloc(512)), (r = 0)),
          r || (r = 0),
          !(e.length >= r + 512))
        )
          throw new Error('need 512 bytes for header');
        let n = this.ctime || this.atime ? 130 : 155,
          i = Sw(this.path || '', n),
          s = i[0],
          o = i[1];
        (this.needPax = i[2]),
          (this.needPax = Dr(e, r, 100, s) || this.needPax),
          (this.needPax = er(e, r + 100, 8, this.mode) || this.needPax),
          (this.needPax = er(e, r + 108, 8, this.uid) || this.needPax),
          (this.needPax = er(e, r + 116, 8, this.gid) || this.needPax),
          (this.needPax = er(e, r + 124, 12, this.size) || this.needPax),
          (this.needPax = Rc(e, r + 136, 12, this.mtime) || this.needPax),
          (e[r + 156] = this[Ye].charCodeAt(0)),
          (this.needPax = Dr(e, r + 157, 100, this.linkpath) || this.needPax),
          e.write('ustar\x0000', r + 257, 8),
          (this.needPax = Dr(e, r + 265, 32, this.uname) || this.needPax),
          (this.needPax = Dr(e, r + 297, 32, this.gname) || this.needPax),
          (this.needPax = er(e, r + 329, 8, this.devmaj) || this.needPax),
          (this.needPax = er(e, r + 337, 8, this.devmin) || this.needPax),
          (this.needPax = Dr(e, r + 345, n, o) || this.needPax),
          e[r + 475] !== 0
            ? (this.needPax = Dr(e, r + 345, 155, o) || this.needPax)
            : ((this.needPax = Dr(e, r + 345, 130, o) || this.needPax),
              (this.needPax = Rc(e, r + 476, 12, this.atime) || this.needPax),
              (this.needPax = Rc(e, r + 488, 12, this.ctime) || this.needPax));
        let a = 8 * 32;
        for (let c = r; c < r + 148; c++) a += e[c];
        for (let c = r + 156; c < r + 512; c++) a += e[c];
        return (
          (this.cksum = a),
          er(e, r + 148, 8, this.cksum),
          (this.cksumValid = !0),
          this.needPax
        );
      }
      set(e) {
        for (let r in e) e[r] !== null && e[r] !== void 0 && (this[r] = e[r]);
      }
      get type() {
        return vc.name.get(this[Ye]) || this[Ye];
      }
      get typeKey() {
        return this[Ye];
      }
      set type(e) {
        vc.code.has(e) ? (this[Ye] = vc.code.get(e)) : (this[Ye] = e);
      }
    },
    Sw = (t, e) => {
      let n = t,
        i = '',
        s,
        o = dn.parse(t).root || '.';
      if (Buffer.byteLength(n) < 100) s = [n, i, !1];
      else {
        (i = dn.dirname(n)), (n = dn.basename(n));
        do
          Buffer.byteLength(n) <= 100 && Buffer.byteLength(i) <= e
            ? (s = [n, i, !1])
            : Buffer.byteLength(n) > 100 && Buffer.byteLength(i) <= e
            ? (s = [n.substr(0, 100 - 1), i, !0])
            : ((n = dn.join(dn.basename(i), n)), (i = dn.dirname(i)));
        while (i !== o && !s);
        s || (s = [t.substr(0, 100 - 1), '', !0]);
      }
      return s;
    },
    Ar = (t, e, r) =>
      t
        .slice(e, e + r)
        .toString('utf8')
        .replace(/\0.*/, ''),
    wc = (t, e, r) => ww(Qt(t, e, r)),
    ww = (t) => (t === null ? null : new Date(t * 1e3)),
    Qt = (t, e, r) => (t[e] & 128 ? dp.parse(t.slice(e, e + r)) : xw(t, e, r)),
    Rw = (t) => (isNaN(t) ? null : t),
    xw = (t, e, r) =>
      Rw(
        parseInt(
          t
            .slice(e, e + r)
            .toString('utf8')
            .replace(/\0.*$/, '')
            .trim(),
          8,
        ),
      ),
    Ow = { 12: 8589934591, 8: 2097151 },
    er = (t, e, r, n) =>
      n === null
        ? !1
        : n > Ow[r] || n < 0
        ? (dp.encode(n, t.slice(e, e + r)), !0)
        : (Tw(t, e, r, n), !1),
    Tw = (t, e, r, n) => t.write(Cw(n, r), e, r, 'ascii'),
    Cw = (t, e) => Iw(Math.floor(t).toString(8), e),
    Iw = (t, e) =>
      (t.length === e - 1 ? t : new Array(e - t.length - 1).join('0') + t + ' ') + '\0',
    Rc = (t, e, r, n) => (n === null ? !1 : er(t, e, r, n.getTime() / 1e3)),
    Nw = new Array(156).join('\0'),
    Dr = (t, e, r, n) =>
      n === null
        ? !1
        : (t.write(n + Nw, e, r, 'utf8'),
          n.length !== Buffer.byteLength(n) || n.length > r);
  pp.exports = xc;
});
var xs = E((HA, mp) => {
  'use strict';
  var Aw = pn(),
    Dw = require('path'),
    ci = class {
      constructor(e, r) {
        (this.atime = e.atime || null),
          (this.charset = e.charset || null),
          (this.comment = e.comment || null),
          (this.ctime = e.ctime || null),
          (this.gid = e.gid || null),
          (this.gname = e.gname || null),
          (this.linkpath = e.linkpath || null),
          (this.mtime = e.mtime || null),
          (this.path = e.path || null),
          (this.size = e.size || null),
          (this.uid = e.uid || null),
          (this.uname = e.uname || null),
          (this.dev = e.dev || null),
          (this.ino = e.ino || null),
          (this.nlink = e.nlink || null),
          (this.global = r || !1);
      }
      encode() {
        let e = this.encodeBody();
        if (e === '') return null;
        let r = Buffer.byteLength(e),
          n = 512 * Math.ceil(1 + r / 512),
          i = Buffer.allocUnsafe(n);
        for (let s = 0; s < 512; s++) i[s] = 0;
        new Aw({
          path: ('PaxHeader/' + Dw.basename(this.path)).slice(0, 99),
          mode: this.mode || 420,
          uid: this.uid || null,
          gid: this.gid || null,
          size: r,
          mtime: this.mtime || null,
          type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
          linkpath: '',
          uname: this.uname || '',
          gname: this.gname || '',
          devmaj: 0,
          devmin: 0,
          atime: this.atime || null,
          ctime: this.ctime || null,
        }).encode(i),
          i.write(e, 512, r, 'utf8');
        for (let s = r + 512; s < i.length; s++) i[s] = 0;
        return i;
      }
      encodeBody() {
        return (
          this.encodeField('path') +
          this.encodeField('ctime') +
          this.encodeField('atime') +
          this.encodeField('dev') +
          this.encodeField('ino') +
          this.encodeField('nlink') +
          this.encodeField('charset') +
          this.encodeField('comment') +
          this.encodeField('gid') +
          this.encodeField('gname') +
          this.encodeField('linkpath') +
          this.encodeField('mtime') +
          this.encodeField('size') +
          this.encodeField('uid') +
          this.encodeField('uname')
        );
      }
      encodeField(e) {
        if (this[e] === null || this[e] === void 0) return '';
        let r = this[e] instanceof Date ? this[e].getTime() / 1e3 : this[e],
          n =
            ' ' +
            (e === 'dev' || e === 'ino' || e === 'nlink' ? 'SCHILY.' : '') +
            e +
            '=' +
            r +
            `
`,
          i = Buffer.byteLength(n),
          s = Math.floor(Math.log(i) / Math.log(10)) + 1;
        return i + s >= Math.pow(10, s) && (s += 1), s + i + n;
      }
    };
  ci.parse = (t, e, r) => new ci(Lw(kw(t), e), r);
  var Lw = (t, e) => (e ? Object.keys(t).reduce((r, n) => ((r[n] = t[n]), r), e) : t),
    kw = (t) =>
      t
        .replace(/\n$/, '')
        .split(
          `
`,
        )
        .reduce(Pw, Object.create(null)),
    Pw = (t, e) => {
      let r = parseInt(e, 10);
      if (r !== Buffer.byteLength(e) + 1) return t;
      e = e.substr((r + ' ').length);
      let n = e.split('='),
        i = n.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
      if (!i) return t;
      let s = n.join('=');
      return (
        (t[i] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(i)
          ? new Date(s * 1e3)
          : /^[0-9]+$/.test(s)
          ? +s
          : s),
        t
      );
    };
  mp.exports = ci;
});
var mn = E((zA, yp) => {
  'use strict';
  yp.exports = (t) => {
    let e = t.length - 1,
      r = -1;
    for (; e > -1 && t.charAt(e) === '/'; ) (r = e), e--;
    return r === -1 ? t : t.slice(0, r);
  };
});
var Os = E((VA, Ep) => {
  'use strict';
  Ep.exports = (t) =>
    class extends t {
      warn(e, r, n = {}) {
        this.file && (n.file = this.file),
          this.cwd && (n.cwd = this.cwd),
          (n.code = (r instanceof Error && r.code) || e),
          (n.tarCode = e),
          !this.strict && n.recoverable !== !1
            ? (r instanceof Error && ((n = Object.assign(r, n)), (r = r.message)),
              this.emit('warn', n.tarCode, r, n))
            : r instanceof Error
            ? this.emit('error', Object.assign(r, n))
            : this.emit('error', Object.assign(new Error(`${e}: ${r}`), n));
      }
    };
});
var Tc = E((XA, gp) => {
  'use strict';
  var Ts = ['|', '<', '>', '?', ':'],
    Oc = Ts.map((t) => String.fromCharCode(61440 + t.charCodeAt(0))),
    Uw = new Map(Ts.map((t, e) => [t, Oc[e]])),
    Fw = new Map(Oc.map((t, e) => [t, Ts[e]]));
  gp.exports = {
    encode: (t) => Ts.reduce((e, r) => e.split(r).join(Uw.get(r)), t),
    decode: (t) => Oc.reduce((e, r) => e.split(r).join(Fw.get(r)), t),
  };
});
var Cc = E((KA, bp) => {
  'use strict';
  var { isAbsolute: Mw, parse: _p } = require('path').win32;
  bp.exports = (t) => {
    let e = '',
      r = _p(t);
    for (; Mw(t) || r.root; ) {
      let n = t.charAt(0) === '/' && t.slice(0, 4) !== '//?/' ? '/' : r.root;
      (t = t.substr(n.length)), (e += n), (r = _p(t));
    }
    return [e, t];
  };
});
var Sp = E((YA, vp) => {
  'use strict';
  vp.exports = (t, e, r) => (
    (t &= 4095),
    r && (t = (t | 384) & -19),
    e && (t & 256 && (t |= 64), t & 32 && (t |= 8), t & 4 && (t |= 1)),
    t
  );
});
var Mc = E((QA, Up) => {
  'use strict';
  var Ip = un(),
    Np = xs(),
    Ap = pn(),
    vt = require('fs'),
    wp = require('path'),
    bt = hn(),
    qw = mn(),
    Dp = (t, e) => (e ? ((t = bt(t).replace(/^\.(\/|$)/, '')), qw(e) + '/' + t) : bt(t)),
    Bw = 16 * 1024 * 1024,
    Rp = Symbol('process'),
    xp = Symbol('file'),
    Op = Symbol('directory'),
    Nc = Symbol('symlink'),
    Tp = Symbol('hardlink'),
    ui = Symbol('header'),
    Cs = Symbol('read'),
    Ac = Symbol('lstat'),
    Is = Symbol('onlstat'),
    Dc = Symbol('onread'),
    Lc = Symbol('onreadlink'),
    kc = Symbol('openfile'),
    Pc = Symbol('onopenfile'),
    tr = Symbol('close'),
    Ns = Symbol('mode'),
    Uc = Symbol('awaitDrain'),
    Ic = Symbol('ondrain'),
    St = Symbol('prefix'),
    Cp = Symbol('hadError'),
    Lp = Os(),
    jw = Tc(),
    kp = Cc(),
    Pp = Sp(),
    As = Lp(
      class extends Ip {
        constructor(e, r) {
          if (((r = r || {}), super(r), typeof e != 'string'))
            throw new TypeError('path is required');
          (this.path = bt(e)),
            (this.portable = !!r.portable),
            (this.myuid = (process.getuid && process.getuid()) || 0),
            (this.myuser = process.env.USER || ''),
            (this.maxReadSize = r.maxReadSize || Bw),
            (this.linkCache = r.linkCache || new Map()),
            (this.statCache = r.statCache || new Map()),
            (this.preservePaths = !!r.preservePaths),
            (this.cwd = bt(r.cwd || process.cwd())),
            (this.strict = !!r.strict),
            (this.noPax = !!r.noPax),
            (this.noMtime = !!r.noMtime),
            (this.mtime = r.mtime || null),
            (this.prefix = r.prefix ? bt(r.prefix) : null),
            (this.fd = null),
            (this.blockLen = null),
            (this.blockRemain = null),
            (this.buf = null),
            (this.offset = null),
            (this.length = null),
            (this.pos = null),
            (this.remain = null),
            typeof r.onwarn == 'function' && this.on('warn', r.onwarn);
          let n = !1;
          if (!this.preservePaths) {
            let [i, s] = kp(this.path);
            i && ((this.path = s), (n = i));
          }
          (this.win32 = !!r.win32 || process.platform === 'win32'),
            this.win32 &&
              ((this.path = jw.decode(this.path.replace(/\\/g, '/'))),
              (e = e.replace(/\\/g, '/'))),
            (this.absolute = bt(r.absolute || wp.resolve(this.cwd, e))),
            this.path === '' && (this.path = './'),
            n &&
              this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, {
                entry: this,
                path: n + this.path,
              }),
            this.statCache.has(this.absolute)
              ? this[Is](this.statCache.get(this.absolute))
              : this[Ac]();
        }
        emit(e, ...r) {
          return e === 'error' && (this[Cp] = !0), super.emit(e, ...r);
        }
        [Ac]() {
          vt.lstat(this.absolute, (e, r) => {
            if (e) return this.emit('error', e);
            this[Is](r);
          });
        }
        [Is](e) {
          this.statCache.set(this.absolute, e),
            (this.stat = e),
            e.isFile() || (e.size = 0),
            (this.type = $w(e)),
            this.emit('stat', e),
            this[Rp]();
        }
        [Rp]() {
          switch (this.type) {
            case 'File':
              return this[xp]();
            case 'Directory':
              return this[Op]();
            case 'SymbolicLink':
              return this[Nc]();
            default:
              return this.end();
          }
        }
        [Ns](e) {
          return Pp(e, this.type === 'Directory', this.portable);
        }
        [St](e) {
          return Dp(e, this.prefix);
        }
        [ui]() {
          this.type === 'Directory' && this.portable && (this.noMtime = !0),
            (this.header = new Ap({
              path: this[St](this.path),
              linkpath: this.type === 'Link' ? this[St](this.linkpath) : this.linkpath,
              mode: this[Ns](this.stat.mode),
              uid: this.portable ? null : this.stat.uid,
              gid: this.portable ? null : this.stat.gid,
              size: this.stat.size,
              mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
              type: this.type,
              uname: this.portable
                ? null
                : this.stat.uid === this.myuid
                ? this.myuser
                : '',
              atime: this.portable ? null : this.stat.atime,
              ctime: this.portable ? null : this.stat.ctime,
            })),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new Np({
                  atime: this.portable ? null : this.header.atime,
                  ctime: this.portable ? null : this.header.ctime,
                  gid: this.portable ? null : this.header.gid,
                  mtime: this.noMtime ? null : this.mtime || this.header.mtime,
                  path: this[St](this.path),
                  linkpath:
                    this.type === 'Link' ? this[St](this.linkpath) : this.linkpath,
                  size: this.header.size,
                  uid: this.portable ? null : this.header.uid,
                  uname: this.portable ? null : this.header.uname,
                  dev: this.portable ? null : this.stat.dev,
                  ino: this.portable ? null : this.stat.ino,
                  nlink: this.portable ? null : this.stat.nlink,
                }).encode(),
              ),
            super.write(this.header.block);
        }
        [Op]() {
          this.path.substr(-1) !== '/' && (this.path += '/'),
            (this.stat.size = 0),
            this[ui](),
            this.end();
        }
        [Nc]() {
          vt.readlink(this.absolute, (e, r) => {
            if (e) return this.emit('error', e);
            this[Lc](r);
          });
        }
        [Lc](e) {
          (this.linkpath = bt(e)), this[ui](), this.end();
        }
        [Tp](e) {
          (this.type = 'Link'),
            (this.linkpath = bt(wp.relative(this.cwd, e))),
            (this.stat.size = 0),
            this[ui](),
            this.end();
        }
        [xp]() {
          if (this.stat.nlink > 1) {
            let e = this.stat.dev + ':' + this.stat.ino;
            if (this.linkCache.has(e)) {
              let r = this.linkCache.get(e);
              if (r.indexOf(this.cwd) === 0) return this[Tp](r);
            }
            this.linkCache.set(e, this.absolute);
          }
          if ((this[ui](), this.stat.size === 0)) return this.end();
          this[kc]();
        }
        [kc]() {
          vt.open(this.absolute, 'r', (e, r) => {
            if (e) return this.emit('error', e);
            this[Pc](r);
          });
        }
        [Pc](e) {
          if (((this.fd = e), this[Cp])) return this[tr]();
          (this.blockLen = 512 * Math.ceil(this.stat.size / 512)),
            (this.blockRemain = this.blockLen);
          let r = Math.min(this.blockLen, this.maxReadSize);
          (this.buf = Buffer.allocUnsafe(r)),
            (this.offset = 0),
            (this.pos = 0),
            (this.remain = this.stat.size),
            (this.length = this.buf.length),
            this[Cs]();
        }
        [Cs]() {
          let { fd: e, buf: r, offset: n, length: i, pos: s } = this;
          vt.read(e, r, n, i, s, (o, a) => {
            if (o) return this[tr](() => this.emit('error', o));
            this[Dc](a);
          });
        }
        [tr](e) {
          vt.close(this.fd, e);
        }
        [Dc](e) {
          if (e <= 0 && this.remain > 0) {
            let i = new Error('encountered unexpected EOF');
            return (
              (i.path = this.absolute),
              (i.syscall = 'read'),
              (i.code = 'EOF'),
              this[tr](() => this.emit('error', i))
            );
          }
          if (e > this.remain) {
            let i = new Error('did not encounter expected EOF');
            return (
              (i.path = this.absolute),
              (i.syscall = 'read'),
              (i.code = 'EOF'),
              this[tr](() => this.emit('error', i))
            );
          }
          if (e === this.remain)
            for (let i = e; i < this.length && e < this.blockRemain; i++)
              (this.buf[i + this.offset] = 0), e++, this.remain++;
          let r =
            this.offset === 0 && e === this.buf.length
              ? this.buf
              : this.buf.slice(this.offset, this.offset + e);
          this.write(r) ? this[Ic]() : this[Uc](() => this[Ic]());
        }
        [Uc](e) {
          this.once('drain', e);
        }
        write(e) {
          if (this.blockRemain < e.length) {
            let r = new Error('writing more data than expected');
            return (r.path = this.absolute), this.emit('error', r);
          }
          return (
            (this.remain -= e.length),
            (this.blockRemain -= e.length),
            (this.pos += e.length),
            (this.offset += e.length),
            super.write(e)
          );
        }
        [Ic]() {
          if (!this.remain)
            return (
              this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
              this[tr]((e) => (e ? this.emit('error', e) : this.end()))
            );
          this.offset >= this.length &&
            ((this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length))),
            (this.offset = 0)),
            (this.length = this.buf.length - this.offset),
            this[Cs]();
        }
      },
    ),
    Fc = class extends As {
      [Ac]() {
        this[Is](vt.lstatSync(this.absolute));
      }
      [Nc]() {
        this[Lc](vt.readlinkSync(this.absolute));
      }
      [kc]() {
        this[Pc](vt.openSync(this.absolute, 'r'));
      }
      [Cs]() {
        let e = !0;
        try {
          let { fd: r, buf: n, offset: i, length: s, pos: o } = this,
            a = vt.readSync(r, n, i, s, o);
          this[Dc](a), (e = !1);
        } finally {
          if (e)
            try {
              this[tr](() => {});
            } catch {}
        }
      }
      [Uc](e) {
        e();
      }
      [tr](e) {
        vt.closeSync(this.fd), e();
      }
    },
    Gw = Lp(
      class extends Ip {
        constructor(e, r) {
          (r = r || {}),
            super(r),
            (this.preservePaths = !!r.preservePaths),
            (this.portable = !!r.portable),
            (this.strict = !!r.strict),
            (this.noPax = !!r.noPax),
            (this.noMtime = !!r.noMtime),
            (this.readEntry = e),
            (this.type = e.type),
            this.type === 'Directory' && this.portable && (this.noMtime = !0),
            (this.prefix = r.prefix || null),
            (this.path = bt(e.path)),
            (this.mode = this[Ns](e.mode)),
            (this.uid = this.portable ? null : e.uid),
            (this.gid = this.portable ? null : e.gid),
            (this.uname = this.portable ? null : e.uname),
            (this.gname = this.portable ? null : e.gname),
            (this.size = e.size),
            (this.mtime = this.noMtime ? null : r.mtime || e.mtime),
            (this.atime = this.portable ? null : e.atime),
            (this.ctime = this.portable ? null : e.ctime),
            (this.linkpath = bt(e.linkpath)),
            typeof r.onwarn == 'function' && this.on('warn', r.onwarn);
          let n = !1;
          if (!this.preservePaths) {
            let [i, s] = kp(this.path);
            i && ((this.path = s), (n = i));
          }
          (this.remain = e.size),
            (this.blockRemain = e.startBlockSize),
            (this.header = new Ap({
              path: this[St](this.path),
              linkpath: this.type === 'Link' ? this[St](this.linkpath) : this.linkpath,
              mode: this.mode,
              uid: this.portable ? null : this.uid,
              gid: this.portable ? null : this.gid,
              size: this.size,
              mtime: this.noMtime ? null : this.mtime,
              type: this.type,
              uname: this.portable ? null : this.uname,
              atime: this.portable ? null : this.atime,
              ctime: this.portable ? null : this.ctime,
            })),
            n &&
              this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, {
                entry: this,
                path: n + this.path,
              }),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new Np({
                  atime: this.portable ? null : this.atime,
                  ctime: this.portable ? null : this.ctime,
                  gid: this.portable ? null : this.gid,
                  mtime: this.noMtime ? null : this.mtime,
                  path: this[St](this.path),
                  linkpath:
                    this.type === 'Link' ? this[St](this.linkpath) : this.linkpath,
                  size: this.size,
                  uid: this.portable ? null : this.uid,
                  uname: this.portable ? null : this.uname,
                  dev: this.portable ? null : this.readEntry.dev,
                  ino: this.portable ? null : this.readEntry.ino,
                  nlink: this.portable ? null : this.readEntry.nlink,
                }).encode(),
              ),
            super.write(this.header.block),
            e.pipe(this);
        }
        [St](e) {
          return Dp(e, this.prefix);
        }
        [Ns](e) {
          return Pp(e, this.type === 'Directory', this.portable);
        }
        write(e) {
          let r = e.length;
          if (r > this.blockRemain)
            throw new Error('writing more to entry than is appropriate');
          return (this.blockRemain -= r), super.write(e);
        }
        end() {
          return (
            this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), super.end()
          );
        }
      },
    );
  As.Sync = Fc;
  As.Tar = Gw;
  var $w = (t) =>
    t.isFile()
      ? 'File'
      : t.isDirectory()
      ? 'Directory'
      : t.isSymbolicLink()
      ? 'SymbolicLink'
      : 'Unsupported';
  Up.exports = As;
});
var Mp = E((eD, Fp) => {
  'use strict';
  Fp.exports = function (t) {
    t.prototype[Symbol.iterator] = function* () {
      for (let e = this.head; e; e = e.next) yield e.value;
    };
  };
});
var qc = E((tD, qp) => {
  'use strict';
  qp.exports = Z;
  Z.Node = Lr;
  Z.create = Z;
  function Z(t) {
    var e = this;
    if (
      (e instanceof Z || (e = new Z()),
      (e.tail = null),
      (e.head = null),
      (e.length = 0),
      t && typeof t.forEach == 'function')
    )
      t.forEach(function (i) {
        e.push(i);
      });
    else if (arguments.length > 0)
      for (var r = 0, n = arguments.length; r < n; r++) e.push(arguments[r]);
    return e;
  }
  Z.prototype.removeNode = function (t) {
    if (t.list !== this)
      throw new Error('removing node which does not belong to this list');
    var e = t.next,
      r = t.prev;
    return (
      e && (e.prev = r),
      r && (r.next = e),
      t === this.head && (this.head = e),
      t === this.tail && (this.tail = r),
      t.list.length--,
      (t.next = null),
      (t.prev = null),
      (t.list = null),
      e
    );
  };
  Z.prototype.unshiftNode = function (t) {
    if (t !== this.head) {
      t.list && t.list.removeNode(t);
      var e = this.head;
      (t.list = this),
        (t.next = e),
        e && (e.prev = t),
        (this.head = t),
        this.tail || (this.tail = t),
        this.length++;
    }
  };
  Z.prototype.pushNode = function (t) {
    if (t !== this.tail) {
      t.list && t.list.removeNode(t);
      var e = this.tail;
      (t.list = this),
        (t.prev = e),
        e && (e.next = t),
        (this.tail = t),
        this.head || (this.head = t),
        this.length++;
    }
  };
  Z.prototype.push = function () {
    for (var t = 0, e = arguments.length; t < e; t++) zw(this, arguments[t]);
    return this.length;
  };
  Z.prototype.unshift = function () {
    for (var t = 0, e = arguments.length; t < e; t++) Vw(this, arguments[t]);
    return this.length;
  };
  Z.prototype.pop = function () {
    if (this.tail) {
      var t = this.tail.value;
      return (
        (this.tail = this.tail.prev),
        this.tail ? (this.tail.next = null) : (this.head = null),
        this.length--,
        t
      );
    }
  };
  Z.prototype.shift = function () {
    if (this.head) {
      var t = this.head.value;
      return (
        (this.head = this.head.next),
        this.head ? (this.head.prev = null) : (this.tail = null),
        this.length--,
        t
      );
    }
  };
  Z.prototype.forEach = function (t, e) {
    e = e || this;
    for (var r = this.head, n = 0; r !== null; n++)
      t.call(e, r.value, n, this), (r = r.next);
  };
  Z.prototype.forEachReverse = function (t, e) {
    e = e || this;
    for (var r = this.tail, n = this.length - 1; r !== null; n--)
      t.call(e, r.value, n, this), (r = r.prev);
  };
  Z.prototype.get = function (t) {
    for (var e = 0, r = this.head; r !== null && e < t; e++) r = r.next;
    if (e === t && r !== null) return r.value;
  };
  Z.prototype.getReverse = function (t) {
    for (var e = 0, r = this.tail; r !== null && e < t; e++) r = r.prev;
    if (e === t && r !== null) return r.value;
  };
  Z.prototype.map = function (t, e) {
    e = e || this;
    for (var r = new Z(), n = this.head; n !== null; )
      r.push(t.call(e, n.value, this)), (n = n.next);
    return r;
  };
  Z.prototype.mapReverse = function (t, e) {
    e = e || this;
    for (var r = new Z(), n = this.tail; n !== null; )
      r.push(t.call(e, n.value, this)), (n = n.prev);
    return r;
  };
  Z.prototype.reduce = function (t, e) {
    var r,
      n = this.head;
    if (arguments.length > 1) r = e;
    else if (this.head) (n = this.head.next), (r = this.head.value);
    else throw new TypeError('Reduce of empty list with no initial value');
    for (var i = 0; n !== null; i++) (r = t(r, n.value, i)), (n = n.next);
    return r;
  };
  Z.prototype.reduceReverse = function (t, e) {
    var r,
      n = this.tail;
    if (arguments.length > 1) r = e;
    else if (this.tail) (n = this.tail.prev), (r = this.tail.value);
    else throw new TypeError('Reduce of empty list with no initial value');
    for (var i = this.length - 1; n !== null; i--) (r = t(r, n.value, i)), (n = n.prev);
    return r;
  };
  Z.prototype.toArray = function () {
    for (var t = new Array(this.length), e = 0, r = this.head; r !== null; e++)
      (t[e] = r.value), (r = r.next);
    return t;
  };
  Z.prototype.toArrayReverse = function () {
    for (var t = new Array(this.length), e = 0, r = this.tail; r !== null; e++)
      (t[e] = r.value), (r = r.prev);
    return t;
  };
  Z.prototype.slice = function (t, e) {
    (e = e || this.length),
      e < 0 && (e += this.length),
      (t = t || 0),
      t < 0 && (t += this.length);
    var r = new Z();
    if (e < t || e < 0) return r;
    t < 0 && (t = 0), e > this.length && (e = this.length);
    for (var n = 0, i = this.head; i !== null && n < t; n++) i = i.next;
    for (; i !== null && n < e; n++, i = i.next) r.push(i.value);
    return r;
  };
  Z.prototype.sliceReverse = function (t, e) {
    (e = e || this.length),
      e < 0 && (e += this.length),
      (t = t || 0),
      t < 0 && (t += this.length);
    var r = new Z();
    if (e < t || e < 0) return r;
    t < 0 && (t = 0), e > this.length && (e = this.length);
    for (var n = this.length, i = this.tail; i !== null && n > e; n--) i = i.prev;
    for (; i !== null && n > t; n--, i = i.prev) r.push(i.value);
    return r;
  };
  Z.prototype.splice = function (t, e, ...r) {
    t > this.length && (t = this.length - 1), t < 0 && (t = this.length + t);
    for (var n = 0, i = this.head; i !== null && n < t; n++) i = i.next;
    for (var s = [], n = 0; i && n < e; n++) s.push(i.value), (i = this.removeNode(i));
    i === null && (i = this.tail), i !== this.head && i !== this.tail && (i = i.prev);
    for (var n = 0; n < r.length; n++) i = Hw(this, i, r[n]);
    return s;
  };
  Z.prototype.reverse = function () {
    for (var t = this.head, e = this.tail, r = t; r !== null; r = r.prev) {
      var n = r.prev;
      (r.prev = r.next), (r.next = n);
    }
    return (this.head = e), (this.tail = t), this;
  };
  function Hw(t, e, r) {
    var n = e === t.head ? new Lr(r, null, e, t) : new Lr(r, e, e.next, t);
    return (
      n.next === null && (t.tail = n), n.prev === null && (t.head = n), t.length++, n
    );
  }
  function zw(t, e) {
    (t.tail = new Lr(e, t.tail, null, t)), t.head || (t.head = t.tail), t.length++;
  }
  function Vw(t, e) {
    (t.head = new Lr(e, null, t.head, t)), t.tail || (t.tail = t.head), t.length++;
  }
  function Lr(t, e, r, n) {
    if (!(this instanceof Lr)) return new Lr(t, e, r, n);
    (this.list = n),
      (this.value = t),
      e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
      r ? ((r.prev = this), (this.next = r)) : (this.next = null);
  }
  try {
    Mp()(Z);
  } catch {}
});
var Bs = E((nD, Vp) => {
  'use strict';
  var Ms = class {
      constructor(e, r) {
        (this.path = e || './'),
          (this.absolute = r),
          (this.entry = null),
          (this.stat = null),
          (this.readdir = null),
          (this.pending = !1),
          (this.ignore = !1),
          (this.piped = !1);
      }
    },
    Ww = un(),
    Xw = Ec(),
    Kw = ws(),
    Xc = Mc(),
    Yw = Xc.Sync,
    Jw = Xc.Tar,
    Zw = qc(),
    Bp = Buffer.alloc(1024),
    ks = Symbol('onStat'),
    Ds = Symbol('ended'),
    wt = Symbol('queue'),
    yn = Symbol('current'),
    kr = Symbol('process'),
    Ls = Symbol('processing'),
    jp = Symbol('processJob'),
    Rt = Symbol('jobs'),
    Bc = Symbol('jobDone'),
    Ps = Symbol('addFSEntry'),
    Gp = Symbol('addTarEntry'),
    Hc = Symbol('stat'),
    zc = Symbol('readdir'),
    Us = Symbol('onreaddir'),
    Fs = Symbol('pipe'),
    $p = Symbol('entry'),
    jc = Symbol('entryOpt'),
    Vc = Symbol('writeEntryClass'),
    zp = Symbol('write'),
    Gc = Symbol('ondrain'),
    qs = require('fs'),
    Hp = require('path'),
    Qw = Os(),
    $c = hn(),
    Kc = Qw(
      class extends Ww {
        constructor(e) {
          super(e),
            (e = e || Object.create(null)),
            (this.opt = e),
            (this.file = e.file || ''),
            (this.cwd = e.cwd || process.cwd()),
            (this.maxReadSize = e.maxReadSize),
            (this.preservePaths = !!e.preservePaths),
            (this.strict = !!e.strict),
            (this.noPax = !!e.noPax),
            (this.prefix = $c(e.prefix || '')),
            (this.linkCache = e.linkCache || new Map()),
            (this.statCache = e.statCache || new Map()),
            (this.readdirCache = e.readdirCache || new Map()),
            (this[Vc] = Xc),
            typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
            (this.portable = !!e.portable),
            (this.zip = null),
            e.gzip
              ? (typeof e.gzip != 'object' && (e.gzip = {}),
                this.portable && (e.gzip.portable = !0),
                (this.zip = new Xw.Gzip(e.gzip)),
                this.zip.on('data', (r) => super.write(r)),
                this.zip.on('end', (r) => super.end()),
                this.zip.on('drain', (r) => this[Gc]()),
                this.on('resume', (r) => this.zip.resume()))
              : this.on('drain', this[Gc]),
            (this.noDirRecurse = !!e.noDirRecurse),
            (this.follow = !!e.follow),
            (this.noMtime = !!e.noMtime),
            (this.mtime = e.mtime || null),
            (this.filter = typeof e.filter == 'function' ? e.filter : (r) => !0),
            (this[wt] = new Zw()),
            (this[Rt] = 0),
            (this.jobs = +e.jobs || 4),
            (this[Ls] = !1),
            (this[Ds] = !1);
        }
        [zp](e) {
          return super.write(e);
        }
        add(e) {
          return this.write(e), this;
        }
        end(e) {
          return e && this.write(e), (this[Ds] = !0), this[kr](), this;
        }
        write(e) {
          if (this[Ds]) throw new Error('write after end');
          return e instanceof Kw ? this[Gp](e) : this[Ps](e), this.flowing;
        }
        [Gp](e) {
          let r = $c(Hp.resolve(this.cwd, e.path));
          if (!this.filter(e.path, e)) e.resume();
          else {
            let n = new Ms(e.path, r, !1);
            (n.entry = new Jw(e, this[jc](n))),
              n.entry.on('end', (i) => this[Bc](n)),
              (this[Rt] += 1),
              this[wt].push(n);
          }
          this[kr]();
        }
        [Ps](e) {
          let r = $c(Hp.resolve(this.cwd, e));
          this[wt].push(new Ms(e, r)), this[kr]();
        }
        [Hc](e) {
          (e.pending = !0), (this[Rt] += 1);
          let r = this.follow ? 'stat' : 'lstat';
          qs[r](e.absolute, (n, i) => {
            (e.pending = !1), (this[Rt] -= 1), n ? this.emit('error', n) : this[ks](e, i);
          });
        }
        [ks](e, r) {
          this.statCache.set(e.absolute, r),
            (e.stat = r),
            this.filter(e.path, r) || (e.ignore = !0),
            this[kr]();
        }
        [zc](e) {
          (e.pending = !0),
            (this[Rt] += 1),
            qs.readdir(e.absolute, (r, n) => {
              if (((e.pending = !1), (this[Rt] -= 1), r)) return this.emit('error', r);
              this[Us](e, n);
            });
        }
        [Us](e, r) {
          this.readdirCache.set(e.absolute, r), (e.readdir = r), this[kr]();
        }
        [kr]() {
          if (!this[Ls]) {
            this[Ls] = !0;
            for (let e = this[wt].head; e !== null && this[Rt] < this.jobs; e = e.next)
              if ((this[jp](e.value), e.value.ignore)) {
                let r = e.next;
                this[wt].removeNode(e), (e.next = r);
              }
            (this[Ls] = !1),
              this[Ds] &&
                !this[wt].length &&
                this[Rt] === 0 &&
                (this.zip ? this.zip.end(Bp) : (super.write(Bp), super.end()));
          }
        }
        get [yn]() {
          return this[wt] && this[wt].head && this[wt].head.value;
        }
        [Bc](e) {
          this[wt].shift(), (this[Rt] -= 1), this[kr]();
        }
        [jp](e) {
          if (!e.pending) {
            if (e.entry) {
              e === this[yn] && !e.piped && this[Fs](e);
              return;
            }
            if (
              (e.stat ||
                (this.statCache.has(e.absolute)
                  ? this[ks](e, this.statCache.get(e.absolute))
                  : this[Hc](e)),
              !!e.stat &&
                !e.ignore &&
                !(
                  !this.noDirRecurse &&
                  e.stat.isDirectory() &&
                  !e.readdir &&
                  (this.readdirCache.has(e.absolute)
                    ? this[Us](e, this.readdirCache.get(e.absolute))
                    : this[zc](e),
                  !e.readdir)
                ))
            ) {
              if (((e.entry = this[$p](e)), !e.entry)) {
                e.ignore = !0;
                return;
              }
              e === this[yn] && !e.piped && this[Fs](e);
            }
          }
        }
        [jc](e) {
          return {
            onwarn: (r, n, i) => this.warn(r, n, i),
            noPax: this.noPax,
            cwd: this.cwd,
            absolute: e.absolute,
            preservePaths: this.preservePaths,
            maxReadSize: this.maxReadSize,
            strict: this.strict,
            portable: this.portable,
            linkCache: this.linkCache,
            statCache: this.statCache,
            noMtime: this.noMtime,
            mtime: this.mtime,
            prefix: this.prefix,
          };
        }
        [$p](e) {
          this[Rt] += 1;
          try {
            return new this[Vc](e.path, this[jc](e))
              .on('end', () => this[Bc](e))
              .on('error', (r) => this.emit('error', r));
          } catch (r) {
            this.emit('error', r);
          }
        }
        [Gc]() {
          this[yn] && this[yn].entry && this[yn].entry.resume();
        }
        [Fs](e) {
          (e.piped = !0),
            e.readdir &&
              e.readdir.forEach((i) => {
                let s = e.path,
                  o = s === './' ? '' : s.replace(/\/*$/, '/');
                this[Ps](o + i);
              });
          let r = e.entry,
            n = this.zip;
          n
            ? r.on('data', (i) => {
                n.write(i) || r.pause();
              })
            : r.on('data', (i) => {
                super.write(i) || r.pause();
              });
        }
        pause() {
          return this.zip && this.zip.pause(), super.pause();
        }
      },
    ),
    Wc = class extends Kc {
      constructor(e) {
        super(e), (this[Vc] = Yw);
      }
      pause() {}
      resume() {}
      [Hc](e) {
        let r = this.follow ? 'statSync' : 'lstatSync';
        this[ks](e, qs[r](e.absolute));
      }
      [zc](e, r) {
        this[Us](e, qs.readdirSync(e.absolute));
      }
      [Fs](e) {
        let r = e.entry,
          n = this.zip;
        e.readdir &&
          e.readdir.forEach((i) => {
            let s = e.path,
              o = s === './' ? '' : s.replace(/\/*$/, '/');
            this[Ps](o + i);
          }),
          n
            ? r.on('data', (i) => {
                n.write(i);
              })
            : r.on('data', (i) => {
                super[zp](i);
              });
      }
    };
  Kc.Sync = Wc;
  Vp.exports = Kc;
});
var Rn = E((fi) => {
  'use strict';
  var eR = un(),
    tR = require('events').EventEmitter,
    He = require('fs'),
    Zc = He.writev;
  if (!Zc) {
    let t = process.binding('fs'),
      e = t.FSReqWrap || t.FSReqCallback;
    Zc = (r, n, i, s) => {
      let o = (c, l) => s(c, l, n),
        a = new e();
      (a.oncomplete = o), t.writeBuffers(r, n, i, a);
    };
  }
  var Sn = Symbol('_autoClose'),
    ft = Symbol('_close'),
    li = Symbol('_ended'),
    te = Symbol('_fd'),
    Wp = Symbol('_finished'),
    nr = Symbol('_flags'),
    Yc = Symbol('_flush'),
    Qc = Symbol('_handleChunk'),
    eu = Symbol('_makeBuf'),
    zs = Symbol('_mode'),
    js = Symbol('_needDrain'),
    bn = Symbol('_onerror'),
    wn = Symbol('_onopen'),
    Jc = Symbol('_onread'),
    gn = Symbol('_onwrite'),
    ir = Symbol('_open'),
    Mt = Symbol('_path'),
    Pr = Symbol('_pos'),
    xt = Symbol('_queue'),
    _n = Symbol('_read'),
    Xp = Symbol('_readSize'),
    rr = Symbol('_reading'),
    Gs = Symbol('_remain'),
    Kp = Symbol('_size'),
    $s = Symbol('_write'),
    En = Symbol('_writing'),
    Hs = Symbol('_defaultFlag'),
    vn = Symbol('_errored'),
    Vs = class extends eR {
      constructor(e, r) {
        if (
          ((r = r || {}),
          super(r),
          (this.readable = !0),
          (this.writable = !1),
          typeof e != 'string')
        )
          throw new TypeError('path must be a string');
        (this[vn] = !1),
          (this[te] = typeof r.fd == 'number' ? r.fd : null),
          (this[Mt] = e),
          (this[Xp] = r.readSize || 16 * 1024 * 1024),
          (this[rr] = !1),
          (this[Kp] = typeof r.size == 'number' ? r.size : 1 / 0),
          (this[Gs] = this[Kp]),
          (this[Sn] = typeof r.autoClose == 'boolean' ? r.autoClose : !0),
          typeof this[te] == 'number' ? this[_n]() : this[ir]();
      }
      get fd() {
        return this[te];
      }
      get path() {
        return this[Mt];
      }
      write() {
        throw new TypeError('this is a readable stream');
      }
      end() {
        throw new TypeError('this is a readable stream');
      }
      [ir]() {
        He.open(this[Mt], 'r', (e, r) => this[wn](e, r));
      }
      [wn](e, r) {
        e ? this[bn](e) : ((this[te] = r), this.emit('open', r), this[_n]());
      }
      [eu]() {
        return Buffer.allocUnsafe(Math.min(this[Xp], this[Gs]));
      }
      [_n]() {
        if (!this[rr]) {
          this[rr] = !0;
          let e = this[eu]();
          if (e.length === 0) return process.nextTick(() => this[Jc](null, 0, e));
          He.read(this[te], e, 0, e.length, null, (r, n, i) => this[Jc](r, n, i));
        }
      }
      [Jc](e, r, n) {
        (this[rr] = !1), e ? this[bn](e) : this[Qc](r, n) && this[_n]();
      }
      [ft]() {
        if (this[Sn] && typeof this[te] == 'number') {
          let e = this[te];
          (this[te] = null),
            He.close(e, (r) => (r ? this.emit('error', r) : this.emit('close')));
        }
      }
      [bn](e) {
        (this[rr] = !0), this[ft](), this.emit('error', e);
      }
      [Qc](e, r) {
        let n = !1;
        return (
          (this[Gs] -= e),
          e > 0 && (n = super.write(e < r.length ? r.slice(0, e) : r)),
          (e === 0 || this[Gs] <= 0) && ((n = !1), this[ft](), super.end()),
          n
        );
      }
      emit(e, r) {
        switch (e) {
          case 'prefinish':
          case 'finish':
            break;
          case 'drain':
            typeof this[te] == 'number' && this[_n]();
            break;
          case 'error':
            return this[vn] ? void 0 : ((this[vn] = !0), super.emit(e, r));
          default:
            return super.emit(e, r);
        }
      }
    },
    tu = class extends Vs {
      [ir]() {
        let e = !0;
        try {
          this[wn](null, He.openSync(this[Mt], 'r')), (e = !1);
        } finally {
          e && this[ft]();
        }
      }
      [_n]() {
        let e = !0;
        try {
          if (!this[rr]) {
            this[rr] = !0;
            do {
              let r = this[eu](),
                n = r.length === 0 ? 0 : He.readSync(this[te], r, 0, r.length, null);
              if (!this[Qc](n, r)) break;
            } while (!0);
            this[rr] = !1;
          }
          e = !1;
        } finally {
          e && this[ft]();
        }
      }
      [ft]() {
        if (this[Sn] && typeof this[te] == 'number') {
          let e = this[te];
          (this[te] = null), He.closeSync(e), this.emit('close');
        }
      }
    },
    Ws = class extends tR {
      constructor(e, r) {
        (r = r || {}),
          super(r),
          (this.readable = !1),
          (this.writable = !0),
          (this[vn] = !1),
          (this[En] = !1),
          (this[li] = !1),
          (this[js] = !1),
          (this[xt] = []),
          (this[Mt] = e),
          (this[te] = typeof r.fd == 'number' ? r.fd : null),
          (this[zs] = r.mode === void 0 ? 438 : r.mode),
          (this[Pr] = typeof r.start == 'number' ? r.start : null),
          (this[Sn] = typeof r.autoClose == 'boolean' ? r.autoClose : !0);
        let n = this[Pr] !== null ? 'r+' : 'w';
        (this[Hs] = r.flags === void 0),
          (this[nr] = this[Hs] ? n : r.flags),
          this[te] === null && this[ir]();
      }
      emit(e, r) {
        if (e === 'error') {
          if (this[vn]) return;
          this[vn] = !0;
        }
        return super.emit(e, r);
      }
      get fd() {
        return this[te];
      }
      get path() {
        return this[Mt];
      }
      [bn](e) {
        this[ft](), (this[En] = !0), this.emit('error', e);
      }
      [ir]() {
        He.open(this[Mt], this[nr], this[zs], (e, r) => this[wn](e, r));
      }
      [wn](e, r) {
        this[Hs] && this[nr] === 'r+' && e && e.code === 'ENOENT'
          ? ((this[nr] = 'w'), this[ir]())
          : e
          ? this[bn](e)
          : ((this[te] = r), this.emit('open', r), this[Yc]());
      }
      end(e, r) {
        return (
          e && this.write(e, r),
          (this[li] = !0),
          !this[En] &&
            !this[xt].length &&
            typeof this[te] == 'number' &&
            this[gn](null, 0),
          this
        );
      }
      write(e, r) {
        return (
          typeof e == 'string' && (e = Buffer.from(e, r)),
          this[li]
            ? (this.emit('error', new Error('write() after end()')), !1)
            : this[te] === null || this[En] || this[xt].length
            ? (this[xt].push(e), (this[js] = !0), !1)
            : ((this[En] = !0), this[$s](e), !0)
        );
      }
      [$s](e) {
        He.write(this[te], e, 0, e.length, this[Pr], (r, n) => this[gn](r, n));
      }
      [gn](e, r) {
        e
          ? this[bn](e)
          : (this[Pr] !== null && (this[Pr] += r),
            this[xt].length
              ? this[Yc]()
              : ((this[En] = !1),
                this[li] && !this[Wp]
                  ? ((this[Wp] = !0), this[ft](), this.emit('finish'))
                  : this[js] && ((this[js] = !1), this.emit('drain'))));
      }
      [Yc]() {
        if (this[xt].length === 0) this[li] && this[gn](null, 0);
        else if (this[xt].length === 1) this[$s](this[xt].pop());
        else {
          let e = this[xt];
          (this[xt] = []), Zc(this[te], e, this[Pr], (r, n) => this[gn](r, n));
        }
      }
      [ft]() {
        if (this[Sn] && typeof this[te] == 'number') {
          let e = this[te];
          (this[te] = null),
            He.close(e, (r) => (r ? this.emit('error', r) : this.emit('close')));
        }
      }
    },
    ru = class extends Ws {
      [ir]() {
        let e;
        if (this[Hs] && this[nr] === 'r+')
          try {
            e = He.openSync(this[Mt], this[nr], this[zs]);
          } catch (r) {
            if (r.code === 'ENOENT') return (this[nr] = 'w'), this[ir]();
            throw r;
          }
        else e = He.openSync(this[Mt], this[nr], this[zs]);
        this[wn](null, e);
      }
      [ft]() {
        if (this[Sn] && typeof this[te] == 'number') {
          let e = this[te];
          (this[te] = null), He.closeSync(e), this.emit('close');
        }
      }
      [$s](e) {
        let r = !0;
        try {
          this[gn](null, He.writeSync(this[te], e, 0, e.length, this[Pr])), (r = !1);
        } finally {
          if (r)
            try {
              this[ft]();
            } catch {}
        }
      }
    };
  fi.ReadStream = Vs;
  fi.ReadStreamSync = tu;
  fi.WriteStream = Ws;
  fi.WriteStreamSync = ru;
});
var eo = E((oD, rm) => {
  'use strict';
  var rR = Os(),
    nR = pn(),
    iR = require('events'),
    sR = qc(),
    oR = 1024 * 1024,
    aR = ws(),
    Yp = xs(),
    cR = Ec(),
    nu = Buffer.from([31, 139]),
    nt = Symbol('state'),
    Ur = Symbol('writeEntry'),
    qt = Symbol('readEntry'),
    iu = Symbol('nextEntry'),
    Jp = Symbol('processEntry'),
    it = Symbol('extendedHeader'),
    hi = Symbol('globalExtendedHeader'),
    sr = Symbol('meta'),
    Zp = Symbol('emitMeta'),
    ae = Symbol('buffer'),
    Bt = Symbol('queue'),
    Fr = Symbol('ended'),
    Qp = Symbol('emittedEnd'),
    Mr = Symbol('emit'),
    ze = Symbol('unzip'),
    Xs = Symbol('consumeChunk'),
    Ks = Symbol('consumeChunkSub'),
    su = Symbol('consumeBody'),
    em = Symbol('consumeMeta'),
    tm = Symbol('consumeHeader'),
    Ys = Symbol('consuming'),
    ou = Symbol('bufferConcat'),
    au = Symbol('maybeEnd'),
    di = Symbol('writing'),
    or = Symbol('aborted'),
    Js = Symbol('onDone'),
    qr = Symbol('sawValidEntry'),
    Zs = Symbol('sawNullBlock'),
    Qs = Symbol('sawEOF'),
    uR = (t) => !0;
  rm.exports = rR(
    class extends iR {
      constructor(e) {
        (e = e || {}),
          super(e),
          (this.file = e.file || ''),
          (this[qr] = null),
          this.on(Js, (r) => {
            (this[nt] === 'begin' || this[qr] === !1) &&
              this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
          }),
          e.ondone
            ? this.on(Js, e.ondone)
            : this.on(Js, (r) => {
                this.emit('prefinish'),
                  this.emit('finish'),
                  this.emit('end'),
                  this.emit('close');
              }),
          (this.strict = !!e.strict),
          (this.maxMetaEntrySize = e.maxMetaEntrySize || oR),
          (this.filter = typeof e.filter == 'function' ? e.filter : uR),
          (this.writable = !0),
          (this.readable = !1),
          (this[Bt] = new sR()),
          (this[ae] = null),
          (this[qt] = null),
          (this[Ur] = null),
          (this[nt] = 'begin'),
          (this[sr] = ''),
          (this[it] = null),
          (this[hi] = null),
          (this[Fr] = !1),
          (this[ze] = null),
          (this[or] = !1),
          (this[Zs] = !1),
          (this[Qs] = !1),
          typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
          typeof e.onentry == 'function' && this.on('entry', e.onentry);
      }
      [tm](e, r) {
        this[qr] === null && (this[qr] = !1);
        let n;
        try {
          n = new nR(e, r, this[it], this[hi]);
        } catch (i) {
          return this.warn('TAR_ENTRY_INVALID', i);
        }
        if (n.nullBlock)
          this[Zs]
            ? ((this[Qs] = !0),
              this[nt] === 'begin' && (this[nt] = 'header'),
              this[Mr]('eof'))
            : ((this[Zs] = !0), this[Mr]('nullBlock'));
        else if (((this[Zs] = !1), !n.cksumValid))
          this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header: n });
        else if (!n.path)
          this.warn('TAR_ENTRY_INVALID', 'path is required', { header: n });
        else {
          let i = n.type;
          if (/^(Symbolic)?Link$/.test(i) && !n.linkpath)
            this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header: n });
          else if (!/^(Symbolic)?Link$/.test(i) && n.linkpath)
            this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header: n });
          else {
            let s = (this[Ur] = new aR(n, this[it], this[hi]));
            if (!this[qr])
              if (s.remain) {
                let o = () => {
                  s.invalid || (this[qr] = !0);
                };
                s.on('end', o);
              } else this[qr] = !0;
            s.meta
              ? s.size > this.maxMetaEntrySize
                ? ((s.ignore = !0),
                  this[Mr]('ignoredEntry', s),
                  (this[nt] = 'ignore'),
                  s.resume())
                : s.size > 0 &&
                  ((this[sr] = ''),
                  s.on('data', (o) => (this[sr] += o)),
                  (this[nt] = 'meta'))
              : ((this[it] = null),
                (s.ignore = s.ignore || !this.filter(s.path, s)),
                s.ignore
                  ? (this[Mr]('ignoredEntry', s),
                    (this[nt] = s.remain ? 'ignore' : 'header'),
                    s.resume())
                  : (s.remain ? (this[nt] = 'body') : ((this[nt] = 'header'), s.end()),
                    this[qt] ? this[Bt].push(s) : (this[Bt].push(s), this[iu]())));
          }
        }
      }
      [Jp](e) {
        let r = !0;
        return (
          e
            ? Array.isArray(e)
              ? this.emit.apply(this, e)
              : ((this[qt] = e),
                this.emit('entry', e),
                e.emittedEnd || (e.on('end', (n) => this[iu]()), (r = !1)))
            : ((this[qt] = null), (r = !1)),
          r
        );
      }
      [iu]() {
        do;
        while (this[Jp](this[Bt].shift()));
        if (!this[Bt].length) {
          let e = this[qt];
          !e || e.flowing || e.size === e.remain
            ? this[di] || this.emit('drain')
            : e.once('drain', (n) => this.emit('drain'));
        }
      }
      [su](e, r) {
        let n = this[Ur],
          i = n.blockRemain,
          s = i >= e.length && r === 0 ? e : e.slice(r, r + i);
        return (
          n.write(s),
          n.blockRemain || ((this[nt] = 'header'), (this[Ur] = null), n.end()),
          s.length
        );
      }
      [em](e, r) {
        let n = this[Ur],
          i = this[su](e, r);
        return this[Ur] || this[Zp](n), i;
      }
      [Mr](e, r, n) {
        !this[Bt].length && !this[qt] ? this.emit(e, r, n) : this[Bt].push([e, r, n]);
      }
      [Zp](e) {
        switch ((this[Mr]('meta', this[sr]), e.type)) {
          case 'ExtendedHeader':
          case 'OldExtendedHeader':
            this[it] = Yp.parse(this[sr], this[it], !1);
            break;
          case 'GlobalExtendedHeader':
            this[hi] = Yp.parse(this[sr], this[hi], !0);
            break;
          case 'NextFileHasLongPath':
          case 'OldGnuLongPath':
            (this[it] = this[it] || Object.create(null)),
              (this[it].path = this[sr].replace(/\0.*/, ''));
            break;
          case 'NextFileHasLongLinkpath':
            (this[it] = this[it] || Object.create(null)),
              (this[it].linkpath = this[sr].replace(/\0.*/, ''));
            break;
          default:
            throw new Error('unknown meta: ' + e.type);
        }
      }
      abort(e) {
        (this[or] = !0),
          this.emit('abort', e),
          this.warn('TAR_ABORT', e, { recoverable: !1 });
      }
      write(e) {
        if (this[or]) return;
        if (this[ze] === null && e) {
          if (
            (this[ae] && ((e = Buffer.concat([this[ae], e])), (this[ae] = null)),
            e.length < nu.length)
          )
            return (this[ae] = e), !0;
          for (let n = 0; this[ze] === null && n < nu.length; n++)
            e[n] !== nu[n] && (this[ze] = !1);
          if (this[ze] === null) {
            let n = this[Fr];
            (this[Fr] = !1),
              (this[ze] = new cR.Unzip()),
              this[ze].on('data', (s) => this[Xs](s)),
              this[ze].on('error', (s) => this.abort(s)),
              this[ze].on('end', (s) => {
                (this[Fr] = !0), this[Xs]();
              }),
              (this[di] = !0);
            let i = this[ze][n ? 'end' : 'write'](e);
            return (this[di] = !1), i;
          }
        }
        (this[di] = !0), this[ze] ? this[ze].write(e) : this[Xs](e), (this[di] = !1);
        let r = this[Bt].length ? !1 : this[qt] ? this[qt].flowing : !0;
        return (
          !r && !this[Bt].length && this[qt].once('drain', (n) => this.emit('drain')), r
        );
      }
      [ou](e) {
        e && !this[or] && (this[ae] = this[ae] ? Buffer.concat([this[ae], e]) : e);
      }
      [au]() {
        if (this[Fr] && !this[Qp] && !this[or] && !this[Ys]) {
          this[Qp] = !0;
          let e = this[Ur];
          if (e && e.blockRemain) {
            let r = this[ae] ? this[ae].length : 0;
            this.warn(
              'TAR_BAD_ARCHIVE',
              `Truncated input (needed ${e.blockRemain} more bytes, only ${r} available)`,
              { entry: e },
            ),
              this[ae] && e.write(this[ae]),
              e.end();
          }
          this[Mr](Js);
        }
      }
      [Xs](e) {
        if (this[Ys]) this[ou](e);
        else if (!e && !this[ae]) this[au]();
        else {
          if (((this[Ys] = !0), this[ae])) {
            this[ou](e);
            let r = this[ae];
            (this[ae] = null), this[Ks](r);
          } else this[Ks](e);
          for (; this[ae] && this[ae].length >= 512 && !this[or] && !this[Qs]; ) {
            let r = this[ae];
            (this[ae] = null), this[Ks](r);
          }
          this[Ys] = !1;
        }
        (!this[ae] || this[Fr]) && this[au]();
      }
      [Ks](e) {
        let r = 0,
          n = e.length;
        for (; r + 512 <= n && !this[or] && !this[Qs]; )
          switch (this[nt]) {
            case 'begin':
            case 'header':
              this[tm](e, r), (r += 512);
              break;
            case 'ignore':
            case 'body':
              r += this[su](e, r);
              break;
            case 'meta':
              r += this[em](e, r);
              break;
            default:
              throw new Error('invalid state: ' + this[nt]);
          }
        r < n &&
          (this[ae]
            ? (this[ae] = Buffer.concat([e.slice(r), this[ae]]))
            : (this[ae] = e.slice(r)));
      }
      end(e) {
        this[or] || (this[ze] ? this[ze].end(e) : ((this[Fr] = !0), this.write(e)));
      }
    },
  );
});
var to = E((aD, om) => {
  'use strict';
  var lR = an(),
    im = eo(),
    xn = require('fs'),
    fR = Rn(),
    nm = require('path'),
    cu = mn();
  om.exports = (t, e, r) => {
    typeof t == 'function'
      ? ((r = t), (e = null), (t = {}))
      : Array.isArray(t) && ((e = t), (t = {})),
      typeof e == 'function' && ((r = e), (e = null)),
      e ? (e = Array.from(e)) : (e = []);
    let n = lR(t);
    if (n.sync && typeof r == 'function')
      throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof r == 'function')
      throw new TypeError('callback only supported with file option');
    return (
      e.length && dR(n, e),
      n.noResume || hR(n),
      n.file && n.sync ? pR(n) : n.file ? mR(n, r) : sm(n)
    );
  };
  var hR = (t) => {
      let e = t.onentry;
      t.onentry = e
        ? (r) => {
            e(r), r.resume();
          }
        : (r) => r.resume();
    },
    dR = (t, e) => {
      let r = new Map(e.map((s) => [cu(s), !0])),
        n = t.filter,
        i = (s, o) => {
          let a = o || nm.parse(s).root || '.',
            c = s === a ? !1 : r.has(s) ? r.get(s) : i(nm.dirname(s), a);
          return r.set(s, c), c;
        };
      t.filter = n ? (s, o) => n(s, o) && i(cu(s)) : (s) => i(cu(s));
    },
    pR = (t) => {
      let e = sm(t),
        r = t.file,
        n = !0,
        i;
      try {
        let s = xn.statSync(r),
          o = t.maxReadSize || 16 * 1024 * 1024;
        if (s.size < o) e.end(xn.readFileSync(r));
        else {
          let a = 0,
            c = Buffer.allocUnsafe(o);
          for (i = xn.openSync(r, 'r'); a < s.size; ) {
            let l = xn.readSync(i, c, 0, o, a);
            (a += l), e.write(c.slice(0, l));
          }
          e.end();
        }
        n = !1;
      } finally {
        if (n && i)
          try {
            xn.closeSync(i);
          } catch {}
      }
    },
    mR = (t, e) => {
      let r = new im(t),
        n = t.maxReadSize || 16 * 1024 * 1024,
        i = t.file,
        s = new Promise((o, a) => {
          r.on('error', a),
            r.on('end', o),
            xn.stat(i, (c, l) => {
              if (c) a(c);
              else {
                let u = new fR.ReadStream(i, { readSize: n, size: l.size });
                u.on('error', a), u.pipe(r);
              }
            });
        });
      return e ? s.then(e, e) : s;
    },
    sm = (t) => new im(t);
});
var hm = E((cD, fm) => {
  'use strict';
  var yR = an(),
    ro = Bs(),
    am = Rn(),
    cm = to(),
    um = require('path');
  fm.exports = (t, e, r) => {
    if (
      (typeof e == 'function' && (r = e),
      Array.isArray(t) && ((e = t), (t = {})),
      !e || !Array.isArray(e) || !e.length)
    )
      throw new TypeError('no files or directories specified');
    e = Array.from(e);
    let n = yR(t);
    if (n.sync && typeof r == 'function')
      throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof r == 'function')
      throw new TypeError('callback only supported with file option');
    return n.file && n.sync
      ? ER(n, e)
      : n.file
      ? gR(n, e, r)
      : n.sync
      ? _R(n, e)
      : bR(n, e);
  };
  var ER = (t, e) => {
      let r = new ro.Sync(t),
        n = new am.WriteStreamSync(t.file, { mode: t.mode || 438 });
      r.pipe(n), lm(r, e);
    },
    gR = (t, e, r) => {
      let n = new ro(t),
        i = new am.WriteStream(t.file, { mode: t.mode || 438 });
      n.pipe(i);
      let s = new Promise((o, a) => {
        i.on('error', a), i.on('close', o), n.on('error', a);
      });
      return uu(n, e), r ? s.then(r, r) : s;
    },
    lm = (t, e) => {
      e.forEach((r) => {
        r.charAt(0) === '@'
          ? cm({
              file: um.resolve(t.cwd, r.substr(1)),
              sync: !0,
              noResume: !0,
              onentry: (n) => t.add(n),
            })
          : t.add(r);
      }),
        t.end();
    },
    uu = (t, e) => {
      for (; e.length; ) {
        let r = e.shift();
        if (r.charAt(0) === '@')
          return cm({
            file: um.resolve(t.cwd, r.substr(1)),
            noResume: !0,
            onentry: (n) => t.add(n),
          }).then((n) => uu(t, e));
        t.add(r);
      }
      t.end();
    },
    _R = (t, e) => {
      let r = new ro.Sync(t);
      return lm(r, e), r;
    },
    bR = (t, e) => {
      let r = new ro(t);
      return uu(r, e), r;
    };
});
var lu = E((uD, _m) => {
  'use strict';
  var vR = an(),
    dm = Bs(),
    Je = require('fs'),
    pm = Rn(),
    mm = to(),
    ym = require('path'),
    Em = pn();
  _m.exports = (t, e, r) => {
    let n = vR(t);
    if (!n.file) throw new TypeError('file is required');
    if (n.gzip) throw new TypeError('cannot append to compressed archives');
    if (!e || !Array.isArray(e) || !e.length)
      throw new TypeError('no files or directories specified');
    return (e = Array.from(e)), n.sync ? SR(n, e) : RR(n, e, r);
  };
  var SR = (t, e) => {
      let r = new dm.Sync(t),
        n = !0,
        i,
        s;
      try {
        try {
          i = Je.openSync(t.file, 'r+');
        } catch (c) {
          if (c.code === 'ENOENT') i = Je.openSync(t.file, 'w+');
          else throw c;
        }
        let o = Je.fstatSync(i),
          a = Buffer.alloc(512);
        e: for (s = 0; s < o.size; s += 512) {
          for (let u = 0, f = 0; u < 512; u += f) {
            if (
              ((f = Je.readSync(i, a, u, a.length - u, s + u)),
              s === 0 && a[0] === 31 && a[1] === 139)
            )
              throw new Error('cannot append to compressed archives');
            if (!f) break e;
          }
          let c = new Em(a);
          if (!c.cksumValid) break;
          let l = 512 * Math.ceil(c.size / 512);
          if (s + l + 512 > o.size) break;
          (s += l), t.mtimeCache && t.mtimeCache.set(c.path, c.mtime);
        }
        (n = !1), wR(t, r, s, i, e);
      } finally {
        if (n)
          try {
            Je.closeSync(i);
          } catch {}
      }
    },
    wR = (t, e, r, n, i) => {
      let s = new pm.WriteStreamSync(t.file, { fd: n, start: r });
      e.pipe(s), xR(e, i);
    },
    RR = (t, e, r) => {
      e = Array.from(e);
      let n = new dm(t),
        i = (o, a, c) => {
          let l = (p, v) => {
              p ? Je.close(o, (m) => c(p)) : c(null, v);
            },
            u = 0;
          if (a === 0) return l(null, 0);
          let f = 0,
            h = Buffer.alloc(512),
            d = (p, v) => {
              if (p) return l(p);
              if (((f += v), f < 512 && v))
                return Je.read(o, h, f, h.length - f, u + f, d);
              if (u === 0 && h[0] === 31 && h[1] === 139)
                return l(new Error('cannot append to compressed archives'));
              if (f < 512) return l(null, u);
              let m = new Em(h);
              if (!m.cksumValid) return l(null, u);
              let w = 512 * Math.ceil(m.size / 512);
              if (u + w + 512 > a || ((u += w + 512), u >= a)) return l(null, u);
              t.mtimeCache && t.mtimeCache.set(m.path, m.mtime),
                (f = 0),
                Je.read(o, h, 0, 512, u, d);
            };
          Je.read(o, h, 0, 512, u, d);
        },
        s = new Promise((o, a) => {
          n.on('error', a);
          let c = 'r+',
            l = (u, f) => {
              if (u && u.code === 'ENOENT' && c === 'r+')
                return (c = 'w+'), Je.open(t.file, c, l);
              if (u) return a(u);
              Je.fstat(f, (h, d) => {
                if (h) return Je.close(f, () => a(h));
                i(f, d.size, (p, v) => {
                  if (p) return a(p);
                  let m = new pm.WriteStream(t.file, { fd: f, start: v });
                  n.pipe(m), m.on('error', a), m.on('close', o), gm(n, e);
                });
              });
            };
          Je.open(t.file, c, l);
        });
      return r ? s.then(r, r) : s;
    },
    xR = (t, e) => {
      e.forEach((r) => {
        r.charAt(0) === '@'
          ? mm({
              file: ym.resolve(t.cwd, r.substr(1)),
              sync: !0,
              noResume: !0,
              onentry: (n) => t.add(n),
            })
          : t.add(r);
      }),
        t.end();
    },
    gm = (t, e) => {
      for (; e.length; ) {
        let r = e.shift();
        if (r.charAt(0) === '@')
          return mm({
            file: ym.resolve(t.cwd, r.substr(1)),
            noResume: !0,
            onentry: (n) => t.add(n),
          }).then((n) => gm(t, e));
        t.add(r);
      }
      t.end();
    };
});
var vm = E((lD, bm) => {
  'use strict';
  var OR = an(),
    TR = lu();
  bm.exports = (t, e, r) => {
    let n = OR(t);
    if (!n.file) throw new TypeError('file is required');
    if (n.gzip) throw new TypeError('cannot append to compressed archives');
    if (!e || !Array.isArray(e) || !e.length)
      throw new TypeError('no files or directories specified');
    return (e = Array.from(e)), CR(n), TR(n, e, r);
  };
  var CR = (t) => {
    let e = t.filter;
    t.mtimeCache || (t.mtimeCache = new Map()),
      (t.filter = e
        ? (r, n) => e(r, n) && !(t.mtimeCache.get(r) > n.mtime)
        : (r, n) => !(t.mtimeCache.get(r) > n.mtime));
  };
});
var Rm = E((fD, wm) => {
  'use strict';
  var { promisify: Sm } = require('util'),
    ar = require('fs'),
    IR = (t) => {
      if (!t) t = { mode: 511, fs: ar };
      else if (typeof t == 'object') t = { mode: 511, fs: ar, ...t };
      else if (typeof t == 'number') t = { mode: t, fs: ar };
      else if (typeof t == 'string') t = { mode: parseInt(t, 8), fs: ar };
      else throw new TypeError('invalid options argument');
      return (
        (t.mkdir = t.mkdir || t.fs.mkdir || ar.mkdir),
        (t.mkdirAsync = Sm(t.mkdir)),
        (t.stat = t.stat || t.fs.stat || ar.stat),
        (t.statAsync = Sm(t.stat)),
        (t.statSync = t.statSync || t.fs.statSync || ar.statSync),
        (t.mkdirSync = t.mkdirSync || t.fs.mkdirSync || ar.mkdirSync),
        t
      );
    };
  wm.exports = IR;
});
var Om = E((hD, xm) => {
  'use strict';
  var NR = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
    { resolve: AR, parse: DR } = require('path'),
    LR = (t) => {
      if (/\0/.test(t))
        throw Object.assign(new TypeError('path must be a string without null bytes'), {
          path: t,
          code: 'ERR_INVALID_ARG_VALUE',
        });
      if (((t = AR(t)), NR === 'win32')) {
        let e = /[*|"<>?:]/,
          { root: r } = DR(t);
        if (e.test(t.substr(r.length)))
          throw Object.assign(new Error('Illegal characters in path.'), {
            path: t,
            code: 'EINVAL',
          });
      }
      return t;
    };
  xm.exports = LR;
});
var Am = E((dD, Nm) => {
  'use strict';
  var { dirname: Tm } = require('path'),
    Cm = (t, e, r = void 0) =>
      r === e
        ? Promise.resolve()
        : t.statAsync(e).then(
            (n) => (n.isDirectory() ? r : void 0),
            (n) => (n.code === 'ENOENT' ? Cm(t, Tm(e), e) : void 0),
          ),
    Im = (t, e, r = void 0) => {
      if (r !== e)
        try {
          return t.statSync(e).isDirectory() ? r : void 0;
        } catch (n) {
          return n.code === 'ENOENT' ? Im(t, Tm(e), e) : void 0;
        }
    };
  Nm.exports = { findMade: Cm, findMadeSync: Im };
});
var du = E((pD, Lm) => {
  'use strict';
  var { dirname: Dm } = require('path'),
    fu = (t, e, r) => {
      e.recursive = !1;
      let n = Dm(t);
      return n === t
        ? e.mkdirAsync(t, e).catch((i) => {
            if (i.code !== 'EISDIR') throw i;
          })
        : e.mkdirAsync(t, e).then(
            () => r || t,
            (i) => {
              if (i.code === 'ENOENT') return fu(n, e).then((s) => fu(t, e, s));
              if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
              return e.statAsync(t).then(
                (s) => {
                  if (s.isDirectory()) return r;
                  throw i;
                },
                () => {
                  throw i;
                },
              );
            },
          );
    },
    hu = (t, e, r) => {
      let n = Dm(t);
      if (((e.recursive = !1), n === t))
        try {
          return e.mkdirSync(t, e);
        } catch (i) {
          if (i.code !== 'EISDIR') throw i;
          return;
        }
      try {
        return e.mkdirSync(t, e), r || t;
      } catch (i) {
        if (i.code === 'ENOENT') return hu(t, e, hu(n, e, r));
        if (i.code !== 'EEXIST' && i.code !== 'EROFS') throw i;
        try {
          if (!e.statSync(t).isDirectory()) throw i;
        } catch {
          throw i;
        }
      }
    };
  Lm.exports = { mkdirpManual: fu, mkdirpManualSync: hu };
});
var Um = E((mD, Pm) => {
  'use strict';
  var { dirname: km } = require('path'),
    { findMade: kR, findMadeSync: PR } = Am(),
    { mkdirpManual: UR, mkdirpManualSync: FR } = du(),
    MR = (t, e) => (
      (e.recursive = !0),
      km(t) === t
        ? e.mkdirAsync(t, e)
        : kR(e, t).then((n) =>
            e
              .mkdirAsync(t, e)
              .then(() => n)
              .catch((i) => {
                if (i.code === 'ENOENT') return UR(t, e);
                throw i;
              }),
          )
    ),
    qR = (t, e) => {
      if (((e.recursive = !0), km(t) === t)) return e.mkdirSync(t, e);
      let n = PR(e, t);
      try {
        return e.mkdirSync(t, e), n;
      } catch (i) {
        if (i.code === 'ENOENT') return FR(t, e);
        throw i;
      }
    };
  Pm.exports = { mkdirpNative: MR, mkdirpNativeSync: qR };
});
var Bm = E((yD, qm) => {
  'use strict';
  var Fm = require('fs'),
    BR = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version,
    pu = BR.replace(/^v/, '').split('.'),
    Mm = +pu[0] > 10 || (+pu[0] == 10 && +pu[1] >= 12),
    jR = Mm ? (t) => t.mkdir === Fm.mkdir : () => !1,
    GR = Mm ? (t) => t.mkdirSync === Fm.mkdirSync : () => !1;
  qm.exports = { useNative: jR, useNativeSync: GR };
});
var Vm = E((ED, zm) => {
  'use strict';
  var On = Rm(),
    Tn = Om(),
    { mkdirpNative: jm, mkdirpNativeSync: Gm } = Um(),
    { mkdirpManual: $m, mkdirpManualSync: Hm } = du(),
    { useNative: $R, useNativeSync: HR } = Bm(),
    Cn = (t, e) => ((t = Tn(t)), (e = On(e)), $R(e) ? jm(t, e) : $m(t, e)),
    zR = (t, e) => ((t = Tn(t)), (e = On(e)), HR(e) ? Gm(t, e) : Hm(t, e));
  Cn.sync = zR;
  Cn.native = (t, e) => jm(Tn(t), On(e));
  Cn.manual = (t, e) => $m(Tn(t), On(e));
  Cn.nativeSync = (t, e) => Gm(Tn(t), On(e));
  Cn.manualSync = (t, e) => Hm(Tn(t), On(e));
  zm.exports = Cn;
});
var Qm = E((gD, Zm) => {
  'use strict';
  var st = require('fs'),
    Br = require('path'),
    VR = st.lchown ? 'lchown' : 'chown',
    WR = st.lchownSync ? 'lchownSync' : 'chownSync',
    Xm =
      st.lchown &&
      !process.version.match(/v1[1-9]+\./) &&
      !process.version.match(/v10\.[6-9]/),
    Wm = (t, e, r) => {
      try {
        return st[WR](t, e, r);
      } catch (n) {
        if (n.code !== 'ENOENT') throw n;
      }
    },
    XR = (t, e, r) => {
      try {
        return st.chownSync(t, e, r);
      } catch (n) {
        if (n.code !== 'ENOENT') throw n;
      }
    },
    KR = Xm
      ? (t, e, r, n) => (i) => {
          !i || i.code !== 'EISDIR' ? n(i) : st.chown(t, e, r, n);
        }
      : (t, e, r, n) => n,
    mu = Xm
      ? (t, e, r) => {
          try {
            return Wm(t, e, r);
          } catch (n) {
            if (n.code !== 'EISDIR') throw n;
            XR(t, e, r);
          }
        }
      : (t, e, r) => Wm(t, e, r),
    YR = process.version,
    Km = (t, e, r) => st.readdir(t, e, r),
    JR = (t, e) => st.readdirSync(t, e);
  /^v4\./.test(YR) && (Km = (t, e, r) => st.readdir(t, r));
  var no = (t, e, r, n) => {
      st[VR](
        t,
        e,
        r,
        KR(t, e, r, (i) => {
          n(i && i.code !== 'ENOENT' ? i : null);
        }),
      );
    },
    Ym = (t, e, r, n, i) => {
      if (typeof e == 'string')
        return st.lstat(Br.resolve(t, e), (s, o) => {
          if (s) return i(s.code !== 'ENOENT' ? s : null);
          (o.name = e), Ym(t, o, r, n, i);
        });
      if (e.isDirectory())
        yu(Br.resolve(t, e.name), r, n, (s) => {
          if (s) return i(s);
          let o = Br.resolve(t, e.name);
          no(o, r, n, i);
        });
      else {
        let s = Br.resolve(t, e.name);
        no(s, r, n, i);
      }
    },
    yu = (t, e, r, n) => {
      Km(t, { withFileTypes: !0 }, (i, s) => {
        if (i) {
          if (i.code === 'ENOENT') return n();
          if (i.code !== 'ENOTDIR' && i.code !== 'ENOTSUP') return n(i);
        }
        if (i || !s.length) return no(t, e, r, n);
        let o = s.length,
          a = null,
          c = (l) => {
            if (!a) {
              if (l) return n((a = l));
              if (--o === 0) return no(t, e, r, n);
            }
          };
        s.forEach((l) => Ym(t, l, e, r, c));
      });
    },
    ZR = (t, e, r, n) => {
      if (typeof e == 'string')
        try {
          let i = st.lstatSync(Br.resolve(t, e));
          (i.name = e), (e = i);
        } catch (i) {
          if (i.code === 'ENOENT') return;
          throw i;
        }
      e.isDirectory() && Jm(Br.resolve(t, e.name), r, n), mu(Br.resolve(t, e.name), r, n);
    },
    Jm = (t, e, r) => {
      let n;
      try {
        n = JR(t, { withFileTypes: !0 });
      } catch (i) {
        if (i.code === 'ENOENT') return;
        if (i.code === 'ENOTDIR' || i.code === 'ENOTSUP') return mu(t, e, r);
        throw i;
      }
      return n && n.length && n.forEach((i) => ZR(t, i, e, r)), mu(t, e, r);
    };
  Zm.exports = yu;
  yu.sync = Jm;
});
var ny = E((_D, Eu) => {
  'use strict';
  var ey = Vm(),
    ot = require('fs'),
    io = require('path'),
    ty = Qm(),
    ht = hn(),
    so = class extends Error {
      constructor(e, r) {
        super('Cannot extract through symbolic link'),
          (this.path = r),
          (this.symlink = e);
      }
      get name() {
        return 'SylinkError';
      }
    },
    oo = class extends Error {
      constructor(e, r) {
        super(r + ": Cannot cd into '" + e + "'"), (this.path = e), (this.code = r);
      }
      get name() {
        return 'CwdError';
      }
    },
    ao = (t, e) => t.get(ht(e)),
    pi = (t, e, r) => t.set(ht(e), r),
    QR = (t, e) => {
      ot.stat(t, (r, n) => {
        (r || !n.isDirectory()) && (r = new oo(t, (r && r.code) || 'ENOTDIR')), e(r);
      });
    };
  Eu.exports = (t, e, r) => {
    t = ht(t);
    let n = e.umask,
      i = e.mode | 448,
      s = (i & n) !== 0,
      o = e.uid,
      a = e.gid,
      c =
        typeof o == 'number' &&
        typeof a == 'number' &&
        (o !== e.processUid || a !== e.processGid),
      l = e.preserve,
      u = e.unlink,
      f = e.cache,
      h = ht(e.cwd),
      d = (m, w) => {
        m
          ? r(m)
          : (pi(f, t, !0),
            w && c ? ty(w, o, a, (L) => d(L)) : s ? ot.chmod(t, i, r) : r());
      };
    if (f && ao(f, t) === !0) return d();
    if (t === h) return QR(t, d);
    if (l) return ey(t, { mode: i }).then((m) => d(null, m), d);
    let v = ht(io.relative(h, t)).split('/');
    co(h, v, i, f, u, h, null, d);
  };
  var co = (t, e, r, n, i, s, o, a) => {
      if (!e.length) return a(null, o);
      let c = e.shift(),
        l = ht(io.resolve(t + '/' + c));
      if (ao(n, l)) return co(l, e, r, n, i, s, o, a);
      ot.mkdir(l, r, ry(l, e, r, n, i, s, o, a));
    },
    ry = (t, e, r, n, i, s, o, a) => (c) => {
      c
        ? ot.lstat(t, (l, u) => {
            if (l) (l.path = l.path && ht(l.path)), a(l);
            else if (u.isDirectory()) co(t, e, r, n, i, s, o, a);
            else if (i)
              ot.unlink(t, (f) => {
                if (f) return a(f);
                ot.mkdir(t, r, ry(t, e, r, n, i, s, o, a));
              });
            else {
              if (u.isSymbolicLink()) return a(new so(t, t + '/' + e.join('/')));
              a(c);
            }
          })
        : ((o = o || t), co(t, e, r, n, i, s, o, a));
    },
    ex = (t) => {
      let e = !1,
        r = 'ENOTDIR';
      try {
        e = ot.statSync(t).isDirectory();
      } catch (n) {
        r = n.code;
      } finally {
        if (!e) throw new oo(t, r);
      }
    };
  Eu.exports.sync = (t, e) => {
    t = ht(t);
    let r = e.umask,
      n = e.mode | 448,
      i = (n & r) !== 0,
      s = e.uid,
      o = e.gid,
      a =
        typeof s == 'number' &&
        typeof o == 'number' &&
        (s !== e.processUid || o !== e.processGid),
      c = e.preserve,
      l = e.unlink,
      u = e.cache,
      f = ht(e.cwd),
      h = (m) => {
        pi(u, t, !0), m && a && ty.sync(m, s, o), i && ot.chmodSync(t, n);
      };
    if (u && ao(u, t) === !0) return h();
    if (t === f) return ex(f), h();
    if (c) return h(ey.sync(t, n));
    let p = ht(io.relative(f, t)).split('/'),
      v = null;
    for (let m = p.shift(), w = f; m && (w += '/' + m); m = p.shift())
      if (((w = ht(io.resolve(w))), !ao(u, w)))
        try {
          ot.mkdirSync(w, n), (v = v || w), pi(u, w, !0);
        } catch {
          let O = ot.lstatSync(w);
          if (O.isDirectory()) {
            pi(u, w, !0);
            continue;
          } else if (l) {
            ot.unlinkSync(w), ot.mkdirSync(w, n), (v = v || w), pi(u, w, !0);
            continue;
          } else if (O.isSymbolicLink()) return new so(w, w + '/' + p.join('/'));
        }
    return h(v);
  };
});
var _u = E((bD, iy) => {
  'use strict';
  var gu = Object.create(null),
    { hasOwnProperty: tx } = Object.prototype;
  iy.exports = (t) => (tx.call(gu, t) || (gu[t] = t.normalize('NFKD')), gu[t]);
});
var cy = E((vD, ay) => {
  'use strict';
  var sy = require('assert'),
    rx = _u(),
    nx = mn(),
    { join: oy } = require('path'),
    ix = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    sx = ix === 'win32';
  ay.exports = () => {
    let t = new Map(),
      e = new Map(),
      r = (l) =>
        l
          .split('/')
          .slice(0, -1)
          .reduce(
            (f, h) => (f.length && (h = oy(f[f.length - 1], h)), f.push(h || '/'), f),
            [],
          ),
      n = new Set(),
      i = (l) => {
        let u = e.get(l);
        if (!u) throw new Error('function does not have any path reservations');
        return {
          paths: u.paths.map((f) => t.get(f)),
          dirs: [...u.dirs].map((f) => t.get(f)),
        };
      },
      s = (l) => {
        let { paths: u, dirs: f } = i(l);
        return (
          u.every((h) => h[0] === l) && f.every((h) => h[0] instanceof Set && h[0].has(l))
        );
      },
      o = (l) => (n.has(l) || !s(l) ? !1 : (n.add(l), l(() => a(l)), !0)),
      a = (l) => {
        if (!n.has(l)) return !1;
        let { paths: u, dirs: f } = e.get(l),
          h = new Set();
        return (
          u.forEach((d) => {
            let p = t.get(d);
            sy.equal(p[0], l),
              p.length === 1
                ? t.delete(d)
                : (p.shift(),
                  typeof p[0] == 'function'
                    ? h.add(p[0])
                    : p[0].forEach((v) => h.add(v)));
          }),
          f.forEach((d) => {
            let p = t.get(d);
            sy(p[0] instanceof Set),
              p[0].size === 1 && p.length === 1
                ? t.delete(d)
                : p[0].size === 1
                ? (p.shift(), h.add(p[0]))
                : p[0].delete(l);
          }),
          n.delete(l),
          h.forEach((d) => o(d)),
          !0
        );
      };
    return {
      check: s,
      reserve: (l, u) => {
        l = sx
          ? ['win32 parallelization disabled']
          : l.map((h) => rx(nx(oy(h))).toLowerCase());
        let f = new Set(l.map((h) => r(h)).reduce((h, d) => h.concat(d)));
        return (
          e.set(u, { dirs: f, paths: l }),
          l.forEach((h) => {
            let d = t.get(h);
            d ? d.push(u) : t.set(h, [u]);
          }),
          f.forEach((h) => {
            let d = t.get(h);
            d
              ? d[d.length - 1] instanceof Set
                ? d[d.length - 1].add(u)
                : d.push(new Set([u]))
              : t.set(h, [new Set([u])]);
          }),
          o(u)
        );
      },
    };
  };
});
var fy = E((SD, ly) => {
  'use strict';
  var ox = process.env.__FAKE_PLATFORM__ || process.platform,
    ax = ox === 'win32',
    cx = global.__FAKE_TESTING_FS__ || require('fs'),
    { O_CREAT: ux, O_TRUNC: lx, O_WRONLY: fx, UV_FS_O_FILEMAP: uy = 0 } = cx.constants,
    hx = ax && !!uy,
    dx = 512 * 1024,
    px = uy | lx | ux | fx;
  ly.exports = hx ? (t) => (t < dx ? px : 'w') : () => 'w';
});
var Cu = E((wD, xy) => {
  'use strict';
  var mx = require('assert'),
    yx = eo(),
    Q = require('fs'),
    Ex = Rn(),
    jt = require('path'),
    Sy = ny(),
    hy = Tc(),
    gx = cy(),
    _x = Cc(),
    Ze = hn(),
    bx = mn(),
    vx = _u(),
    dy = Symbol('onEntry'),
    Su = Symbol('checkFs'),
    py = Symbol('checkFs2'),
    fo = Symbol('pruneCache'),
    wu = Symbol('isReusable'),
    at = Symbol('makeFs'),
    Ru = Symbol('file'),
    xu = Symbol('directory'),
    ho = Symbol('link'),
    my = Symbol('symlink'),
    yy = Symbol('hardlink'),
    Ey = Symbol('unsupported'),
    gy = Symbol('checkPath'),
    cr = Symbol('mkdir'),
    De = Symbol('onError'),
    uo = Symbol('pending'),
    _y = Symbol('pend'),
    In = Symbol('unpend'),
    bu = Symbol('ended'),
    vu = Symbol('maybeClose'),
    Ou = Symbol('skip'),
    mi = Symbol('doChown'),
    yi = Symbol('uid'),
    Ei = Symbol('gid'),
    gi = Symbol('checkedCwd'),
    wy = require('crypto'),
    Ry = fy(),
    Sx = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    _i = Sx === 'win32',
    wx = (t, e) => {
      if (!_i) return Q.unlink(t, e);
      let r = t + '.DELETE.' + wy.randomBytes(16).toString('hex');
      Q.rename(t, r, (n) => {
        if (n) return e(n);
        Q.unlink(r, e);
      });
    },
    Rx = (t) => {
      if (!_i) return Q.unlinkSync(t);
      let e = t + '.DELETE.' + wy.randomBytes(16).toString('hex');
      Q.renameSync(t, e), Q.unlinkSync(e);
    },
    by = (t, e, r) => (t === t >>> 0 ? t : e === e >>> 0 ? e : r),
    vy = (t) => vx(bx(Ze(t))).toLowerCase(),
    xx = (t, e) => {
      e = vy(e);
      for (let r of t.keys()) {
        let n = vy(r);
        (n === e || n.indexOf(e + '/') === 0) && t.delete(r);
      }
    },
    Ox = (t) => {
      for (let e of t.keys()) t.delete(e);
    },
    bi = class extends yx {
      constructor(e) {
        if (
          (e || (e = {}),
          (e.ondone = (r) => {
            (this[bu] = !0), this[vu]();
          }),
          super(e),
          (this[gi] = !1),
          (this.reservations = gx()),
          (this.transform = typeof e.transform == 'function' ? e.transform : null),
          (this.writable = !0),
          (this.readable = !1),
          (this[uo] = 0),
          (this[bu] = !1),
          (this.dirCache = e.dirCache || new Map()),
          typeof e.uid == 'number' || typeof e.gid == 'number')
        ) {
          if (typeof e.uid != 'number' || typeof e.gid != 'number')
            throw new TypeError('cannot set owner without number uid and gid');
          if (e.preserveOwner)
            throw new TypeError(
              'cannot preserve owner in archive and also set owner explicitly',
            );
          (this.uid = e.uid), (this.gid = e.gid), (this.setOwner = !0);
        } else (this.uid = null), (this.gid = null), (this.setOwner = !1);
        e.preserveOwner === void 0 && typeof e.uid != 'number'
          ? (this.preserveOwner = process.getuid && process.getuid() === 0)
          : (this.preserveOwner = !!e.preserveOwner),
          (this.processUid =
            (this.preserveOwner || this.setOwner) && process.getuid
              ? process.getuid()
              : null),
          (this.processGid =
            (this.preserveOwner || this.setOwner) && process.getgid
              ? process.getgid()
              : null),
          (this.forceChown = e.forceChown === !0),
          (this.win32 = !!e.win32 || _i),
          (this.newer = !!e.newer),
          (this.keep = !!e.keep),
          (this.noMtime = !!e.noMtime),
          (this.preservePaths = !!e.preservePaths),
          (this.unlink = !!e.unlink),
          (this.cwd = Ze(jt.resolve(e.cwd || process.cwd()))),
          (this.strip = +e.strip || 0),
          (this.processUmask = e.noChmod ? 0 : process.umask()),
          (this.umask = typeof e.umask == 'number' ? e.umask : this.processUmask),
          (this.dmode = e.dmode || 511 & ~this.umask),
          (this.fmode = e.fmode || 438 & ~this.umask),
          this.on('entry', (r) => this[dy](r));
      }
      warn(e, r, n = {}) {
        return (
          (e === 'TAR_BAD_ARCHIVE' || e === 'TAR_ABORT') && (n.recoverable = !1),
          super.warn(e, r, n)
        );
      }
      [vu]() {
        this[bu] &&
          this[uo] === 0 &&
          (this.emit('prefinish'),
          this.emit('finish'),
          this.emit('end'),
          this.emit('close'));
      }
      [gy](e) {
        if (this.strip) {
          let r = Ze(e.path).split('/');
          if (r.length < this.strip) return !1;
          if (((e.path = r.slice(this.strip).join('/')), e.type === 'Link')) {
            let n = Ze(e.linkpath).split('/');
            if (n.length >= this.strip) e.linkpath = n.slice(this.strip).join('/');
            else return !1;
          }
        }
        if (!this.preservePaths) {
          let r = Ze(e.path),
            n = r.split('/');
          if (n.includes('..') || (_i && /^[a-z]:\.\.$/i.test(n[0])))
            return (
              this.warn('TAR_ENTRY_ERROR', "path contains '..'", { entry: e, path: r }),
              !1
            );
          let [i, s] = _x(r);
          i &&
            ((e.path = s),
            this.warn('TAR_ENTRY_INFO', `stripping ${i} from absolute path`, {
              entry: e,
              path: r,
            }));
        }
        if (
          (jt.isAbsolute(e.path)
            ? (e.absolute = Ze(jt.resolve(e.path)))
            : (e.absolute = Ze(jt.resolve(this.cwd, e.path))),
          !this.preservePaths &&
            e.absolute.indexOf(this.cwd + '/') !== 0 &&
            e.absolute !== this.cwd)
        )
          return (
            this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
              entry: e,
              path: Ze(e.path),
              resolvedPath: e.absolute,
              cwd: this.cwd,
            }),
            !1
          );
        if (e.absolute === this.cwd && e.type !== 'Directory' && e.type !== 'GNUDumpDir')
          return !1;
        if (this.win32) {
          let { root: r } = jt.win32.parse(e.absolute);
          e.absolute = r + hy.encode(e.absolute.substr(r.length));
          let { root: n } = jt.win32.parse(e.path);
          e.path = n + hy.encode(e.path.substr(n.length));
        }
        return !0;
      }
      [dy](e) {
        if (!this[gy](e)) return e.resume();
        switch ((mx.equal(typeof e.absolute, 'string'), e.type)) {
          case 'Directory':
          case 'GNUDumpDir':
            e.mode && (e.mode = e.mode | 448);
          case 'File':
          case 'OldFile':
          case 'ContiguousFile':
          case 'Link':
          case 'SymbolicLink':
            return this[Su](e);
          case 'CharacterDevice':
          case 'BlockDevice':
          case 'FIFO':
          default:
            return this[Ey](e);
        }
      }
      [De](e, r) {
        e.name === 'CwdError'
          ? this.emit('error', e)
          : (this.warn('TAR_ENTRY_ERROR', e, { entry: r }), this[In](), r.resume());
      }
      [cr](e, r, n) {
        Sy(
          Ze(e),
          {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: r,
            noChmod: this.noChmod,
          },
          n,
        );
      }
      [mi](e) {
        return (
          this.forceChown ||
          (this.preserveOwner &&
            ((typeof e.uid == 'number' && e.uid !== this.processUid) ||
              (typeof e.gid == 'number' && e.gid !== this.processGid))) ||
          (typeof this.uid == 'number' && this.uid !== this.processUid) ||
          (typeof this.gid == 'number' && this.gid !== this.processGid)
        );
      }
      [yi](e) {
        return by(this.uid, e.uid, this.processUid);
      }
      [Ei](e) {
        return by(this.gid, e.gid, this.processGid);
      }
      [Ru](e, r) {
        let n = e.mode & 4095 || this.fmode,
          i = new Ex.WriteStream(e.absolute, {
            flags: Ry(e.size),
            mode: n,
            autoClose: !1,
          });
        i.on('error', (c) => {
          i.fd && Q.close(i.fd, () => {}), (i.write = () => !0), this[De](c, e), r();
        });
        let s = 1,
          o = (c) => {
            if (c) {
              i.fd && Q.close(i.fd, () => {}), this[De](c, e), r();
              return;
            }
            --s === 0 &&
              Q.close(i.fd, (l) => {
                l ? this[De](l, e) : this[In](), r();
              });
          };
        i.on('finish', (c) => {
          let l = e.absolute,
            u = i.fd;
          if (e.mtime && !this.noMtime) {
            s++;
            let f = e.atime || new Date(),
              h = e.mtime;
            Q.futimes(u, f, h, (d) => (d ? Q.utimes(l, f, h, (p) => o(p && d)) : o()));
          }
          if (this[mi](e)) {
            s++;
            let f = this[yi](e),
              h = this[Ei](e);
            Q.fchown(u, f, h, (d) => (d ? Q.chown(l, f, h, (p) => o(p && d)) : o()));
          }
          o();
        });
        let a = (this.transform && this.transform(e)) || e;
        a !== e &&
          (a.on('error', (c) => {
            this[De](c, e), r();
          }),
          e.pipe(a)),
          a.pipe(i);
      }
      [xu](e, r) {
        let n = e.mode & 4095 || this.dmode;
        this[cr](e.absolute, n, (i) => {
          if (i) {
            this[De](i, e), r();
            return;
          }
          let s = 1,
            o = (a) => {
              --s === 0 && (r(), this[In](), e.resume());
            };
          e.mtime &&
            !this.noMtime &&
            (s++, Q.utimes(e.absolute, e.atime || new Date(), e.mtime, o)),
            this[mi](e) && (s++, Q.chown(e.absolute, this[yi](e), this[Ei](e), o)),
            o();
        });
      }
      [Ey](e) {
        (e.unsupported = !0),
          this.warn('TAR_ENTRY_UNSUPPORTED', `unsupported entry type: ${e.type}`, {
            entry: e,
          }),
          e.resume();
      }
      [my](e, r) {
        this[ho](e, e.linkpath, 'symlink', r);
      }
      [yy](e, r) {
        let n = Ze(jt.resolve(this.cwd, e.linkpath));
        this[ho](e, n, 'link', r);
      }
      [_y]() {
        this[uo]++;
      }
      [In]() {
        this[uo]--, this[vu]();
      }
      [Ou](e) {
        this[In](), e.resume();
      }
      [wu](e, r) {
        return e.type === 'File' && !this.unlink && r.isFile() && r.nlink <= 1 && !_i;
      }
      [Su](e) {
        this[_y]();
        let r = [e.path];
        e.linkpath && r.push(e.linkpath),
          this.reservations.reserve(r, (n) => this[py](e, n));
      }
      [fo](e) {
        e.type === 'SymbolicLink'
          ? Ox(this.dirCache)
          : e.type !== 'Directory' && xx(this.dirCache, e.absolute);
      }
      [py](e, r) {
        this[fo](e);
        let n = (a) => {
            this[fo](e), r(a);
          },
          i = () => {
            this[cr](this.cwd, this.dmode, (a) => {
              if (a) {
                this[De](a, e), n();
                return;
              }
              (this[gi] = !0), s();
            });
          },
          s = () => {
            if (e.absolute !== this.cwd) {
              let a = Ze(jt.dirname(e.absolute));
              if (a !== this.cwd)
                return this[cr](a, this.dmode, (c) => {
                  if (c) {
                    this[De](c, e), n();
                    return;
                  }
                  o();
                });
            }
            o();
          },
          o = () => {
            Q.lstat(e.absolute, (a, c) => {
              if (c && (this.keep || (this.newer && c.mtime > e.mtime))) {
                this[Ou](e), n();
                return;
              }
              if (a || this[wu](e, c)) return this[at](null, e, n);
              if (c.isDirectory()) {
                if (e.type === 'Directory') {
                  let l = !this.noChmod && e.mode && (c.mode & 4095) !== e.mode,
                    u = (f) => this[at](f, e, n);
                  return l ? Q.chmod(e.absolute, e.mode, u) : u();
                }
                if (e.absolute !== this.cwd)
                  return Q.rmdir(e.absolute, (l) => this[at](l, e, n));
              }
              if (e.absolute === this.cwd) return this[at](null, e, n);
              wx(e.absolute, (l) => this[at](l, e, n));
            });
          };
        this[gi] ? s() : i();
      }
      [at](e, r, n) {
        if (e) {
          this[De](e, r), n();
          return;
        }
        switch (r.type) {
          case 'File':
          case 'OldFile':
          case 'ContiguousFile':
            return this[Ru](r, n);
          case 'Link':
            return this[yy](r, n);
          case 'SymbolicLink':
            return this[my](r, n);
          case 'Directory':
          case 'GNUDumpDir':
            return this[xu](r, n);
        }
      }
      [ho](e, r, n, i) {
        Q[n](r, e.absolute, (s) => {
          s ? this[De](s, e) : (this[In](), e.resume()), i();
        });
      }
    },
    lo = (t) => {
      try {
        return [null, t()];
      } catch (e) {
        return [e, null];
      }
    },
    Tu = class extends bi {
      [at](e, r) {
        return super[at](e, r, () => {});
      }
      [Su](e) {
        if ((this[fo](e), !this[gi])) {
          let s = this[cr](this.cwd, this.dmode);
          if (s) return this[De](s, e);
          this[gi] = !0;
        }
        if (e.absolute !== this.cwd) {
          let s = Ze(jt.dirname(e.absolute));
          if (s !== this.cwd) {
            let o = this[cr](s, this.dmode);
            if (o) return this[De](o, e);
          }
        }
        let [r, n] = lo(() => Q.lstatSync(e.absolute));
        if (n && (this.keep || (this.newer && n.mtime > e.mtime))) return this[Ou](e);
        if (r || this[wu](e, n)) return this[at](null, e);
        if (n.isDirectory()) {
          if (e.type === 'Directory') {
            let o = !this.noChmod && e.mode && (n.mode & 4095) !== e.mode,
              [a] = o
                ? lo(() => {
                    Q.chmodSync(e.absolute, e.mode);
                  })
                : [];
            return this[at](a, e);
          }
          let [s] = lo(() => Q.rmdirSync(e.absolute));
          this[at](s, e);
        }
        let [i] = e.absolute === this.cwd ? [] : lo(() => Rx(e.absolute));
        this[at](i, e);
      }
      [Ru](e, r) {
        let n = e.mode & 4095 || this.fmode,
          i = (a) => {
            let c;
            try {
              Q.closeSync(s);
            } catch (l) {
              c = l;
            }
            (a || c) && this[De](a || c, e), r();
          },
          s;
        try {
          s = Q.openSync(e.absolute, Ry(e.size), n);
        } catch (a) {
          return i(a);
        }
        let o = (this.transform && this.transform(e)) || e;
        o !== e && (o.on('error', (a) => this[De](a, e)), e.pipe(o)),
          o.on('data', (a) => {
            try {
              Q.writeSync(s, a, 0, a.length);
            } catch (c) {
              i(c);
            }
          }),
          o.on('end', (a) => {
            let c = null;
            if (e.mtime && !this.noMtime) {
              let l = e.atime || new Date(),
                u = e.mtime;
              try {
                Q.futimesSync(s, l, u);
              } catch (f) {
                try {
                  Q.utimesSync(e.absolute, l, u);
                } catch {
                  c = f;
                }
              }
            }
            if (this[mi](e)) {
              let l = this[yi](e),
                u = this[Ei](e);
              try {
                Q.fchownSync(s, l, u);
              } catch (f) {
                try {
                  Q.chownSync(e.absolute, l, u);
                } catch {
                  c = c || f;
                }
              }
            }
            i(c);
          });
      }
      [xu](e, r) {
        let n = e.mode & 4095 || this.dmode,
          i = this[cr](e.absolute, n);
        if (i) {
          this[De](i, e), r();
          return;
        }
        if (e.mtime && !this.noMtime)
          try {
            Q.utimesSync(e.absolute, e.atime || new Date(), e.mtime);
          } catch {}
        if (this[mi](e))
          try {
            Q.chownSync(e.absolute, this[yi](e), this[Ei](e));
          } catch {}
        r(), e.resume();
      }
      [cr](e, r) {
        try {
          return Sy.sync(Ze(e), {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: r,
          });
        } catch (n) {
          return n;
        }
      }
      [ho](e, r, n, i) {
        try {
          Q[n + 'Sync'](r, e.absolute), i(), e.resume();
        } catch (s) {
          return this[De](s, e);
        }
      }
    };
  bi.Sync = Tu;
  xy.exports = bi;
});
var Ny = E((RD, Iy) => {
  'use strict';
  var Tx = an(),
    po = Cu(),
    Ty = require('fs'),
    Cy = Rn(),
    Oy = require('path'),
    Iu = mn();
  Iy.exports = (t, e, r) => {
    typeof t == 'function'
      ? ((r = t), (e = null), (t = {}))
      : Array.isArray(t) && ((e = t), (t = {})),
      typeof e == 'function' && ((r = e), (e = null)),
      e ? (e = Array.from(e)) : (e = []);
    let n = Tx(t);
    if (n.sync && typeof r == 'function')
      throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof r == 'function')
      throw new TypeError('callback only supported with file option');
    return (
      e.length && Cx(n, e),
      n.file && n.sync ? Ix(n) : n.file ? Nx(n, r) : n.sync ? Ax(n) : Dx(n)
    );
  };
  var Cx = (t, e) => {
      let r = new Map(e.map((s) => [Iu(s), !0])),
        n = t.filter,
        i = (s, o) => {
          let a = o || Oy.parse(s).root || '.',
            c = s === a ? !1 : r.has(s) ? r.get(s) : i(Oy.dirname(s), a);
          return r.set(s, c), c;
        };
      t.filter = n ? (s, o) => n(s, o) && i(Iu(s)) : (s) => i(Iu(s));
    },
    Ix = (t) => {
      let e = new po.Sync(t),
        r = t.file,
        n = Ty.statSync(r),
        i = t.maxReadSize || 16 * 1024 * 1024;
      new Cy.ReadStreamSync(r, { readSize: i, size: n.size }).pipe(e);
    },
    Nx = (t, e) => {
      let r = new po(t),
        n = t.maxReadSize || 16 * 1024 * 1024,
        i = t.file,
        s = new Promise((o, a) => {
          r.on('error', a),
            r.on('close', o),
            Ty.stat(i, (c, l) => {
              if (c) a(c);
              else {
                let u = new Cy.ReadStream(i, { readSize: n, size: l.size });
                u.on('error', a), u.pipe(r);
              }
            });
        });
      return e ? s.then(e, e) : s;
    },
    Ax = (t) => new po.Sync(t),
    Dx = (t) => new po(t);
});
var Ay = E((fe) => {
  'use strict';
  fe.c = fe.create = hm();
  fe.r = fe.replace = lu();
  fe.t = fe.list = to();
  fe.u = fe.update = vm();
  fe.x = fe.extract = Ny();
  fe.Pack = Bs();
  fe.Unpack = Cu();
  fe.Parse = eo();
  fe.ReadEntry = ws();
  fe.WriteEntry = Mc();
  fe.Header = pn();
  fe.Pax = xs();
  fe.types = bc();
});
var Ly,
  Le,
  Gr,
  ky,
  Dy,
  mo,
  jr,
  ur,
  yo = q(() => {
    'use strict';
    (Ly = require('crypto')),
      (Le = require('fs')),
      (Gr = br(require('path'))),
      (ky = require('path'));
    gt();
    ie();
    Dt();
    Jn();
    (Dy = za()),
      (mo = Ay()),
      ({ output: jr } = Y()),
      (ur = class {
        constructor(e, r, n, i) {
          this.encryption = e;
          this.errorReporter = r;
          this.context = i;
          this.storedHashes = [];
          this.axiosConfigBuilder = (e) => e;
          if (n.customProxyConfigPath) {
            let { fileServerProxyConfig: s } = require((0, ky.join)(
              process.cwd(),
              n.customProxyConfigPath,
            ));
            this.axiosConfigBuilder = s ?? this.axiosConfigBuilder;
          }
        }
        async retrieve(e, r, n) {
          process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
            jr.note({
              title: `Nx Cloud: Downloading ${e}`,
              bodyLines: [`RETRIEVAL URL: ${r}`],
            });
          let i = this.createFileName(e, n),
            s = this.createCommitFilePath(e, n);
          try {
            await this.downloadFile(r, i, s),
              this.createCommitFile(s),
              F && jr.note({ title: `Nx Cloud: Downloaded ${e}` });
          } catch (o) {
            let a = o.message || o.toString(),
              c = `Failed to download or untar the cached artifacts for ${e}. Context: ${this.context}. Error: ${a}.`;
            throw (
              ((this.context === 'dte-agent' || this.context === 'dte-main') &&
                (jr.note({
                  title: `An error occurred while trying to download artifacts in the DTE context. Hash: ${e}.`,
                  bodyLines: [
                    '- Please update the nx-cloud package to the latest version.',
                    '- Please update the nx package to 15.8.9 or higher. You can do it without updating the plugins.',
                    '- If you are not able to update the nx package, and you are passing --configuration to a run-many or an affected command, define that configuration for all the projects.',
                  ],
                }),
                process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
                  jr.note({ title: `URL: ${e}` })),
              await this.errorReporter.reportError(c),
              new Error(c))
            );
          }
        }
        async store(e, r, n) {
          process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
            jr.note({
              title: `Nx Cloud: Storing ${e}`,
              bodyLines: [`STORAGE URL: ${r}`],
            });
          let i;
          if (process.env.NRWL_INTERNAL_TAR_DEBUG) {
            let o = 1,
              a = !1,
              c = [];
            for (; o <= 3 && !a; ) {
              i = await this.createFile(e, n);
              let l = `/tmp/${e}/attempt${o}`;
              (0, Le.mkdirSync)(l, { recursive: !0 });
              try {
                let u = (0, Le.createReadStream)(i).pipe(mo.x({ cwd: l }));
                await this.convertStreamIntoPromise(u), (a = !0);
              } catch (u) {
                console.error(u), await tt(5e3);
              }
              c.push({ attempt: o, success: a }), o++;
            }
            if (c.some((l) => !l.success)) {
              console.error(JSON.stringify(c, null, 2));
              let l = c
                .filter((u) => !u.success)
                .map((u) => u.attempt)
                .join(', ');
              throw new Error(
                `Untar failed for hash ${e} in attempts ${l} out of ${c.length}`,
              );
            }
          } else i = await this.createFile(e, n);
          await this.uploadFile(r, i),
            this.storedHashes.push(e),
            F && jr.note({ title: `Nx Cloud: Stored ${e}` });
        }
        createFileName(e, r) {
          return Gr.join(r, `${e}.tar.gz`);
        }
        async downloadFile(e, r, n) {
          var o;
          let i = Ce('retrieveFile'),
            s;
          try {
            let a = new URL(e),
              c = a.origin + a.pathname,
              l = {};
            for (let [u, f] of a.searchParams.entries()) l[u] = f;
            (s = await ce(() =>
              Dy(
                c,
                this.axiosConfigBuilder({
                  method: 'GET',
                  responseType: 'stream',
                  maxContentLength: Et ? Kn : Yn,
                  maxBodyLength: Et ? Kn : Yn,
                  timeout: Et ? Xn : 6e4,
                  params: l,
                }),
              ),
            )),
              i.recordMetric({ ...re(s), payloadSize: s.data.headers['content-length'] });
          } catch (a) {
            throw (
              (i.recordMetric(
                (o = a == null ? void 0 : a.axiosException) != null && o.response
                  ? re(a.axiosException.response)
                  : Ie,
              ),
              a)
            );
          }
          if ((0, Le.existsSync)(r)) {
            let a = 0;
            for (; a++ < 50; ) {
              if ((0, Le.existsSync)(n)) return;
              await tt(500);
            }
          }
          if (this.encryption.hasEncryption()) {
            await new Promise((c) => {
              s.data.pipe((0, Le.createWriteStream)(r)).on('close', () => c(null));
            }),
              this.encryption.decryptFile(r);
            let a = (0, Le.createReadStream)(r).pipe(mo.x({ cwd: Gr.dirname(r) }));
            return this.convertStreamIntoPromise(a);
          } else {
            let a = s.data.pipe(mo.x({ cwd: Gr.dirname(r) }));
            return this.convertStreamIntoPromise(a);
          }
        }
        convertStreamIntoPromise(e) {
          return new Promise((r, n) => {
            e.on('error', (i) => {
              i.tarCode === 'TAR_ABORT' &&
              i.message.indexOf('incorrect header check') > -1
                ? (console.warn(
                    'FileStorage: Decompression OK, Trailing garbage ignored.',
                  ),
                  r(null))
                : n(i);
            }),
              e.on('close', () => r(null));
          });
        }
        createCommitFile(e) {
          (0, Le.writeFileSync)(e, 'true');
        }
        createCommitFilePath(e, r) {
          return Gr.join(r, `${e}.commit`);
        }
        async createFile(e, r) {
          let n = this.createFileName(e, r);
          try {
            (0, Le.unlinkSync)(Gr.join(r, e, 'source'));
          } catch {}
          return (
            await mo.c({ gzip: !0, file: n, cwd: r }, [e]),
            this.encryption.hasEncryption() && this.encryption.encryptFile(n),
            n
          );
        }
        async uploadFile(e, r) {
          var a;
          process.env.NX_CLOUD_ECONNABORTED_LOGGING == 'true' &&
            jr.note({ title: `Attempting to upload file with path: ${r}` });
          let n = Ce('storeFile'),
            i = (0, Le.readFileSync)(r),
            s = this.generateMD5(i),
            o = this.getFileUploadHeaders(e, s);
          try {
            let c = await ce(() =>
              Dy(
                e,
                this.axiosConfigBuilder({
                  method: 'PUT',
                  data: i,
                  headers: o,
                  maxContentLength: Et ? Kn : Yn,
                  maxBodyLength: Et ? Kn : Yn,
                  timeout: Et ? Xn : 12e4,
                }),
              ),
            );
            n.recordMetric({ ...re(c), payloadSize: c.config.headers['Content-Length'] });
          } catch (c) {
            if (c.message && c.message.includes('RetentionPolicyNotMet')) return;
            throw (
              (n.recordMetric(
                (a = c == null ? void 0 : c.axiosException) != null && a.response
                  ? re(c.axiosException.response)
                  : Ie,
              ),
              c)
            );
          }
        }
        generateMD5(e) {
          let r = (0, Ly.createHash)('md5');
          return r.update(e), r.digest('base64');
        }
        getFileUploadHeaders(e, r) {
          let n = e.includes('/file/'),
            i = {
              'Content-Type': 'application/octet-stream',
              'x-ms-blob-type': 'BlockBlob',
            };
          return n && (i['Content-MD5'] = r), i;
        }
      });
  });
var Eo,
  Py = q(() => {
    'use strict';
    ie();
    ni();
    Eo = class {
      constructor(e, r, n) {
        this.runContext = e;
        this.taskExecutions = r;
        this.distributedExecutionId = n;
      }
      printCacheHitsMessage() {
        if (ut(this.distributedExecutionId) || !this.runContext.runUrl) return;
        let e = !!this.taskExecutions.find((s) => s.status !== 0),
          r = !!this.taskExecutions.find((s) => s.cacheStatus === 'cache-miss'),
          n = this.taskExecutions
            .filter((s) => this.runContext.statuses[s.hash] === 'remote-cache-hit')
            .map((s) => s.projectName),
          i = [];
        if (e)
          i.push(`View structured, searchable error logs at ${this.runContext.runUrl}`);
        else if (r)
          i.push(`View logs and investigate cache misses at ${this.runContext.runUrl}`);
        else if (n.length > 0) {
          let s = n.length === 1 ? n[0] : `${n.length} tasks`;
          i.push(`Nx Cloud made it possible to reuse ${s}: ${this.runContext.runUrl}`);
        } else
          this.runContext.runUrl &&
            i.push(`View logs and run details at ${this.runContext.runUrl}`);
        i.length > 0 && Xt(i.join(' '));
      }
    };
  });
var Lx,
  Nn,
  Nu = q(() => {
    'use strict';
    ni();
    ({ output: Lx } = Y()),
      (Nn = class {
        constructor(e) {
          this.options = e;
          this.cacheError = null;
          this.apiError = null;
          this.message = null;
        }
        get anyErrors() {
          return this.cacheError || this.apiError;
        }
        printMessages() {
          if (this.anyErrors) {
            let e = [];
            this.cacheError && e.push(`- ${this.cacheError}`),
              this.apiError &&
                this.apiError !== this.cacheError &&
                e.push(`- ${this.apiError}`),
              Lx.warn({ title: 'Nx Cloud Problems', bodyLines: e });
          }
          this.message && Xt(this.message);
        }
        extractErrorMessage(e, r) {
          if (e.code === 'ECONNABORTED')
            return (
              process.env.NX_CLOUD_ECONNABORTED_LOGGING == 'true' &&
                (console.log('[NX CLOUD DEBUG] Request config without `data`'),
                delete e.config.data,
                console.log(JSON.stringify(e.config, null, 2))),
              `Cannot connect to Nx Cloud (scope: ${r}, code: ${e.code}). Try invoking the command with the NX_CLOUD_NO_TIMEOUTS env variable set to 'true'.`
            );
          if (
            e.code === 'ECONNREFUSED' ||
            e.code === 'EAI_AGAIN' ||
            e.code === 'ENOTFOUND' ||
            e.code === 'EPROTO'
          )
            return `Cannot connect to Nx Cloud (scope: ${r}, code: ${e.code}).`;
          if (e.response && e.response.status === 401)
            return e.response.data.message ? e.response.data.message : e.response.data;
          if (e.response && e.response.status === 402)
            return this.options.showUsageWarnings === !1 ||
              this.options.showUsageWarnings === void 0
              ? null
              : e.response.data.message
              ? e.response.data.message
              : e.response.data;
          {
            let n = '';
            e.response && e.response.data && e.response.data.message
              ? (n = `. ${e.response.data.message}`)
              : e.response && e.response.data && (n = `. ${e.response.data}`);
            let i = e.code ? ` (code: ${e.code})` : '';
            return `${e.message}${n}${i}`;
          }
        }
      });
  });
var lr,
  go = q(() => {
    'use strict';
    lr = class {
      constructor(e = []) {
        this.normalizedMaskedProperties = [];
        this.normalizedMaskedProperties = Array.from(new Set(e)).map(this.toCamelCase);
      }
      obfuscate(e) {
        return (
          this.normalizedMaskedProperties.length &&
            (this.normalizedMaskedProperties.forEach((n) => {
              let i = new RegExp(`(--${n}=)[\\S]*`);
              e = e.replace(i, '$1********');
            }),
            this.normalizedMaskedProperties
              .filter((n) => n in process.env)
              .map((n) => process.env[n])
              .forEach((n) => {
                e = e.replace(n, '********');
              })),
          e
        );
      }
      toCamelCase(e) {
        return e.indexOf('-') > 1
          ? e.toLowerCase().replace(/-(.)/g, (r, n) => n.toUpperCase())
          : e;
      }
    };
  });
function An(t) {
  return t.overrides.__overrides_unparsed__
    ? t.overrides.__overrides_unparsed__.join(' ')
    : Au(t.overrides).join(' ');
}
function Au(t) {
  let e = [];
  for (let r of Object.keys(t)) {
    let n = t[r];
    Uy(r, n, e);
  }
  return e;
}
function Uy(t, e, r) {
  if (t === '_') r.push(...e);
  else if (e === !0) r.push(`--${t}`);
  else if (e === !1) r.push(`--no-${t}`);
  else if (Array.isArray(e)) e.forEach((n) => Uy(t, n, r));
  else if (typeof e == 'string' && kx(e)) {
    let n = e.replace(/"/g, String.raw`\"`);
    r.push(`--${t}="${n}"`);
  } else e != null && r.push(`--${t}=${e}`);
}
function kx(t) {
  return t.includes(' ') || t.includes('{') || t.includes('"');
}
var vi = q(() => {
  'use strict';
});
function _o(t, e, r, n, i) {
  let s;
  t
    ? t.startsWith('./')
      ? (s = (0, ku.join)(Fy, t))
      : (s = t)
    : (s = (0, ku.join)(Fy, 'node_modules', '.cache', 'nx'));
  try {
    let o = Mx(s, r),
      a = e.obfuscate(o);
    if (sh) return a;
    let c = n === 'cache-miss' ? (i === 0 ? Ux : Px) : Fx;
    return a.length > c
      ? `TRUNCATED

${a.slice(a.length - c)}`
      : a;
  } catch (o) {
    return process.env.NX_VERBOSE_LOGGING === 'true' && console.error(o), '';
  }
}
function Mx(t, e) {
  try {
    return (0, Du.readFileSync)(Lu.join(t, 'terminalOutputs', e)).toString();
  } catch {
    try {
      return (0, Du.readFileSync)(Lu.join(t, e, 'terminalOutput')).toString();
    } catch {
      return '';
    }
  }
}
var Du,
  Lu,
  ku,
  Fy,
  Px,
  Ux,
  Fx,
  Pu = q(() => {
    'use strict';
    (Du = require('fs')), (Lu = br(require('path'))), (ku = require('path'));
    ie();
    ({ workspaceRoot: Fy } = Y()), (Px = 2e5), (Ux = 2e4), (Fx = 2e4);
  });
var My,
  bo,
  qy = q(() => {
    'use strict';
    My = require('crypto');
    vi();
    Pu();
    bo = class {
      constructor(e, r, n, i, s, o) {
        this.runContext = e;
        this.cacheDirectory = r;
        this.collectTerminalOutput = n;
        this.cacheableOperations = i;
        this.outputObfuscator = s;
        this.tasks = o;
      }
      scheduleTask(e) {
        this.runContext.scheduledTasks.push(e);
      }
      startTask(e) {
        this.tasks.push({
          taskId: e.id,
          startTime: new Date().toISOString(),
          target: e.target.target,
          projectName: e.target.project,
          hash: e.hash,
          hashDetails: this.cleanUpHashDetails(e.hashDetails),
          params: An(e),
          uploadedToStorage: !1,
        });
      }
      endTasks(e) {
        for (let r of e) {
          let n,
            i = r.status === 'remote-cache',
            s = r.status === 'cache',
            o =
              r.status === 'local-cache' || r.status === 'local-cache-kept-existing' || s;
          this.runContext.statuses[r.task.hash]
            ? (n = this.runContext.statuses[r.task.hash])
            : i
            ? (n = 'remote-cache-hit')
            : o
            ? (n = 'local-cache-hit')
            : (n = 'cache-miss'),
            this.updateStartedTask(r, n);
        }
      }
      endCommand() {}
      updateStartedTask(e, r) {
        let n = this.tasks.find((i) => i.taskId === e.task.id);
        if (!n) throw new Error(`Cannot find task ${e.task.id}`);
        e != null && e.startTime && e != null && e.endTime
          ? ((n.startTime = new Date(e.startTime).toISOString()),
            (n.endTime = new Date(e.endTime).toISOString()))
          : (n.endTime = new Date().toISOString()),
          (n.status = e.code),
          (n.params = this.outputObfuscator.obfuscate(n.params)),
          (n.cacheStatus = r),
          this.collectTerminalOutput &&
            (n.terminalOutput = this.getTerminalOutput(
              e.task.hash,
              n.cacheStatus,
              e.code,
            ));
      }
      getTerminalOutput(e, r, n) {
        return _o(this.cacheDirectory, this.outputObfuscator, e, r, n);
      }
      cleanUpHashDetails(e) {
        let r = {},
          n = [];
        for (let i of Object.keys(e.nodes))
          i.startsWith('npm:') ? n.push(e.nodes[i]) : (r[i] = e.nodes[i]);
        if ((n.sort(), n.length > 0)) {
          let i = (0, My.createHash)('md5');
          i.update(n.join('|')), (r.npmDependencies = i.digest('base64'));
        }
        return { nodes: r, runtime: e.runtime, implicitDeps: e.implicitDeps };
      }
    };
  });
var Uu,
  vo,
  By = q(() => {
    'use strict';
    ie();
    ({ output: Uu } = Y()),
      (vo = class {
        constructor(e, r, n, i, s, o) {
          this.messages = e;
          this.api = r;
          this.runContext = n;
          this.fileStorage = i;
          this.distributedExecutionId = s;
          this.storeInCurrentProcess = o;
          this.storeRequests = [];
          this.delayedStoreRequests = [];
        }
        async retrieve(e, r) {
          if (this.messages.cacheError) return !1;
          let n = await this.hashUrls(e);
          if (!n || !n.get)
            return (
              F && Uu.note({ title: `Nx Cloud: Cache miss ${e}.` }),
              (this.runContext.statuses[e] = 'cache-miss'),
              !1
            );
          try {
            return (
              await this.fileStorage.retrieve(e, n.get, r),
              (this.runContext.statuses[e] = 'remote-cache-hit'),
              !0
            );
          } catch (i) {
            let s = i.axiosException ?? i;
            return (
              s.response && s.response.status === 404
                ? F && Uu.note({ title: `Nx Cloud: Cache miss ${e}. Status 404.` })
                : (this.messages.cacheError = this.messages.extractErrorMessage(
                    s,
                    'storage',
                  )),
              (this.runContext.statuses[e] = 'cache-miss'),
              !1
            );
          }
        }
        async store(e, r) {
          if (this.messages.cacheError) return !1;
          let n = Promise.resolve().then(async () => {
            let i = await this.hashUrls(e);
            if (!i) return !1;
            if (!i.put)
              return (
                F &&
                  Uu.note({
                    title: `Nx Cloud: Skipping storing ${e}.`,
                    bodyLines: [
                      'There are several reasons why this can happen.',
                      'Maybe you are using a read-only token or the artifact has already being uploaded.',
                    ],
                  }),
                !0
              );
            if (!this.storeInCurrentProcess)
              return this.delayedStoreRequests.push({ hash: e, url: i.put }), !0;
            try {
              return await this.fileStorage.store(e, i.put, r), !0;
            } catch (s) {
              let o = s.axiosException ?? s;
              return (
                (this.messages.cacheError = this.messages.extractErrorMessage(
                  o,
                  'storage',
                )),
                !1
              );
            }
          });
          return this.storeRequests.push(n), n;
        }
        async hashUrls(e) {
          if (e in this.runContext.requests)
            return (await this.runContext.requests[e])[e];
          {
            let r = this.runContext.scheduledTasks
              .filter((i) => !this.runContext.requests[i.hash])
              .map((i) => i.hash);
            r.indexOf(e) === -1 && r.push(e);
            let n = this.api.startRun(this.distributedExecutionId, r);
            return (
              r.forEach((i) => {
                this.runContext.requests[i] = n;
              }),
              (await n)[e]
            );
          }
        }
        async waitForStoreRequestsToComplete() {
          if (
            !(await Promise.all(this.storeRequests).then((r) =>
              r.reduce((n, i) => n && i, !0),
            ))
          )
            throw new Error('Error when storing artifacts');
        }
      });
  });
function fr() {
  for (let t of Object.values(qx))
    if (t.detectorFn(process.env)) {
      let e = t.contextRetrieverFn(process.env);
      return (
        F && console.log(JSON.stringify(e, null, 2)), { ...e, inferredFromTaskRunner: !0 }
      );
    }
  return F && console.log('[Nx Cloud] Did not identify a VCS platform.'), null;
}
function Bx(t) {
  return t.CIRCLECI === 'true';
}
function jx(t) {
  F && console.log('[Nx Cloud] Detected Env: CircleCI');
  let e = (n) => {
      if (n.CIRCLE_PR_NUMBER !== void 0) return n.CIRCLE_PR_NUMBER;
      if (n.CIRCLE_PULL_REQUEST !== void 0) {
        let i = n.CIRCLE_PULL_REQUEST.split('/');
        return i[i.length - 1];
      }
      return n.CIRCLE_BRANCH !== void 0 ? n.CIRCLE_BRANCH : 'unknown';
    },
    r = (n) =>
      n.CIRCLE_USERNAME !== void 0
        ? n.CIRCLE_USERNAME
        : n.CIRCLE_PR_USERNAME
        ? n.CIRCLE_PR_USERNAME
        : null;
  return {
    branch: e(t),
    ref: t.CIRCLE_BRANCH ?? null,
    title: Mu(),
    headSha: t.CIRCLE_SHA1 ?? 'unknown',
    baseSha: null,
    commitLink: t.CIRCLE_PULL_REQUEST ?? null,
    author: r(t),
    authorUrl: null,
    authorAvatarUrl: null,
    repositoryUrl: t.CIRCLE_REPOSITORY_URL ?? null,
  };
}
function Gx(t) {
  return t.TRAVIS === 'true';
}
function $x(t) {
  return (
    F && console.log('[Nx Cloud] Detected Env: TravisCI'),
    {
      branch: ((r) =>
        r.TRAVIS_EVENT_TYPE === 'pull_request' ? r.TRAVIS_PULL_REQUEST : r.TRAVIS_BRANCH)(
        t,
      ),
      ref: null,
      title: t.TRAVIS_COMMIT_MESSAGE,
      headSha: t.TRAVIS_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: jy(),
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: null,
    }
  );
}
function Hx(t) {
  return t.GITHUB_ACTIONS === 'true';
}
function zx(t) {
  F && console.log('[Nx Cloud] Detected Env: GitHub Actions');
  let e = (i) => {
      if (i.GITHUB_REF) {
        let s = i.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
        if (s) return s[1];
      }
      return i.GITHUB_HEAD_REF
        ? i.GITHUB_HEAD_REF
        : i.GITHUB_REF_NAME
        ? i.GITHUB_REF_NAME
        : 'unknown';
    },
    r = (i) => {
      let s = `${i.GITHUB_SERVER_URL}/${i.GITHUB_REPOSITORY}`;
      return i.GITHUB_EVENT_NAME === 'pull_request'
        ? `${s}/pull/${e(i)}`
        : `${s}/commit/${i.GITHUB_SHA}`;
    },
    n = (i) =>
      i.GITHUB_HEAD_REF ? i.GITHUB_HEAD_REF : i.GITHUB_REF ? i.GITHUB_REF : null;
  return {
    branch: e(t),
    ref: n(t),
    title: Mu(),
    headSha: t.GITHUB_SHA ?? 'unknown',
    baseSha: null,
    commitLink: r(t),
    author: t.GITHUB_ACTOR ?? null,
    authorUrl: `https://github.com/${t.GITHUB_ACTOR}`,
    authorAvatarUrl: `https://avatars.githubusercontent.com/u/${t.GITHUB_ACTOR_ID}`,
    repositoryUrl: `${t.GITHUB_SERVER_URL}/${t.GITHUB_REPOSITORY}`,
  };
}
function Vx(t) {
  return t.BITBUCKET_BUILD_NUMBER != null;
}
function Wx(t) {
  return (
    F && console.log('[Nx Cloud] Detected Env: BitBucket Pipelines'),
    {
      branch: t.BITBUCKET_PR_ID ?? t.BITBUCKET_BRANCH ?? 'unknown',
      ref: null,
      title: Mu(),
      headSha: t.BITBUCKET_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: jy(),
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: t.BITBUCKET_GIT_HTTP_ORIGIN ?? null,
    }
  );
}
function Xx(t) {
  return t.BUILD_BUILDID !== void 0 && t.AGENT_NAME !== void 0;
}
function Kx(t) {
  return (
    F && console.log('[Nx Cloud] Detected Env: Azure DevOps'),
    {
      branch:
        t.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ?? t.BUILD_SOURCEBRANCHNAME ?? 'unknown',
      ref: null,
      title: t.BUILD_SOURCEVERSIONMESSAGE ?? null,
      headSha: et() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: t.BUILD_REQUESTEDFOR ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl:
        t.SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI ?? t.BUILD_REPOSITORY_URI ?? null,
    }
  );
}
function Yx(t) {
  return t.GITLAB_CI === 'true';
}
function Jx(t) {
  return (
    F && console.log('[Nx Cloud] Detected Env: GitLab Pipelines'),
    {
      branch: ((r) =>
        r.CI_MERGE_REQUEST_IID
          ? r.CI_MERGE_REQUEST_IID
          : r.CI_COMMIT_BRANCH
          ? r.CI_COMMIT_BRANCH
          : 'unknown')(t),
      ref: t.CI_COMMIT_REF_NAME ?? null,
      title: t.CI_COMMIT_MESSAGE ?? null,
      headSha: et() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: t.GITLAB_USER_NAME ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: t.CI_REPOSITORY_URL ?? null,
    }
  );
}
function Mu() {
  try {
    return (0, Fu.execSync)('git log -1 --pretty=%B', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
function jy() {
  try {
    return (0, Fu.execSync)('git log -1 --pretty=%aN', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
var Fu,
  qx,
  So = q(() => {
    'use strict';
    Fu = require('child_process');
    ie();
    qx = {
      CIRCLE_CI: { detectorFn: Bx, contextRetrieverFn: jx },
      TRAVIS_CI: { detectorFn: Gx, contextRetrieverFn: $x },
      GITHUB_ACTIONS: { detectorFn: Hx, contextRetrieverFn: zx },
      BITBUCKET_PIPELINES: { detectorFn: Vx, contextRetrieverFn: Wx },
      AZURE_DEVOPS: { detectorFn: Xx, contextRetrieverFn: Kx },
      GITLAB_PIPELINES: { detectorFn: Yx, contextRetrieverFn: Jx },
    };
  });
var Gy,
  $y,
  Hy,
  wo,
  Dn,
  qu = q(() => {
    'use strict';
    (Gy = require('fs')), ($y = require('util')), (Hy = require('zlib'));
    gt();
    ie();
    So();
    Dt();
    ({ output: wo } = Y()),
      (Dn = class {
        constructor(e, r, n, i) {
          this.messages = e;
          this.runContext = r;
          this.machineInfo = i;
          this.apiAxiosInstance = Te(n);
        }
        async startRun(e, r) {
          var i;
          if (this.messages.apiError) return {};
          let n = Ce('startRun');
          try {
            let s = {
              meta: { nxCloudVersion: this.nxCloudVersion() },
              branch: me(),
              runGroup: ve(),
              ciExecutionId: je(),
              ciExecutionEnv: xe(),
              distributedExecutionId: e,
              hashes: r,
              machineInfo: this.machineInfo,
              vcsContext: fr(),
            };
            F &&
              wo.note({
                title: 'RunStart',
                bodyLines: [
                  `
` + JSON.stringify(s, null, 2),
                ],
              });
            let o = await Wa('RunStart duration', () =>
              ce(() => this.apiAxiosInstance.post('/nx-cloud/runs/start', s)),
            );
            return (
              n.recordMetric(re(o)),
              o.data && o.data.message && (this.messages.message = o.data.message),
              !o.data || !o.data.urls
                ? ((this.messages.apiError = `Invalid Nx Cloud response: ${JSON.stringify(
                    o.data,
                  )}`),
                  {})
                : o.data.urls
            );
          } catch (s) {
            return (
              n.recordMetric(
                (i = s == null ? void 0 : s.axiosException) != null && i.response
                  ? re(s.axiosException.response)
                  : Ie,
              ),
              (this.messages.apiError = this.messages.extractErrorMessage(s, 'api')),
              {}
            );
          }
        }
        createReqBody(e, r, n, i) {
          let s = {
            meta: { nxCloudVersion: this.nxCloudVersion() },
            tasks: r,
            run: e,
            linkId: i,
            ...n,
            machineInfo: this.machineInfo,
            vcsContext: fr(),
          };
          return JSON.stringify(s);
        }
        async endRun(e, r, n, i) {
          var l;
          if (this.messages.apiError) return !1;
          (e.runGroup = null), (e.branch = null);
          let s = this.createReqBody(e, r, n, i);
          s.length > 20 * 1e3 * 1e3 &&
            (s = this.createReqBody(
              e,
              r.map((u) => ({ ...u, hashDetails: void 0 })),
              n,
              i,
            ));
          let o = Buffer.from(s),
            a = await (0, $y.promisify)(Hy.gzip)(o),
            c = Ce('endRun');
          try {
            if (F) {
              let f = r.map((h) => ({
                ...h,
                terminalOutput: h.terminalOutput
                  ? `${h.terminalOutput.slice(0, 20)}...`
                  : void 0,
              }));
              wo.note({
                title: 'RunEnd. Completed tasks',
                bodyLines: [
                  `
` + JSON.stringify(f, null, 2),
                ],
              });
            }
            let u = await Wa('RunEnd duration', () =>
              ce(() =>
                this.apiAxiosInstance.post('/nx-cloud/runs/end', a, {
                  headers: {
                    ...this.apiAxiosInstance.defaults.headers,
                    'Content-Encoding': 'gzip',
                    'Content-Type': 'application/octet-stream',
                  },
                }),
              ),
            );
            if (u) {
              if (
                (c.recordMetric(re(u)),
                u.data && u.data.runUrl && u.data.status === 'success')
              )
                return (this.runContext.runUrl = u.data.runUrl), !0;
              u.data && u.data.status
                ? (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
                    u.data.message,
                  )}`)
                : u.data && typeof u.data == 'string'
                ? u.data !== 'success' &&
                  (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
                    u.data,
                  )}`)
                : (this.messages.apiError = `Invalid end run response: ${JSON.stringify(
                    u.data,
                  )}`),
                F &&
                  wo.note({
                    title: 'Invalid end run response',
                    bodyLines: [JSON.stringify(u.data, null, 2)],
                  });
            } else
              wo.error({
                title: 'Nx Cloud: Unknown Error Occurred',
                bodyLines: [
                  'Run completion responded with `undefined`.',
                  'Run Details:',
                  JSON.stringify(e, null, 2),
                  'Stack Trace:',
                  JSON.stringify(new Error().stack, null, 2),
                ],
              });
            return !1;
          } catch (u) {
            c.recordMetric(
              (l = u == null ? void 0 : u.axiosException) != null && l.response
                ? re(u.axiosException.response)
                : Ie,
            );
            let f = u.axiosException ?? u;
            return (
              (this.messages.apiError = this.messages.extractErrorMessage(f, 'api')), !1
            );
          }
        }
        nxCloudVersion() {
          try {
            let e = JSON.parse((0, Gy.readFileSync)('package.json').toString());
            return e.devDependencies['nx-cloud'] || e.devDependencies['@nrwl/nx-cloud'];
          } catch {
            return 'unknown';
          }
        }
      });
  });
function Ro() {
  let t = '';
  for (let e = 0; e < 10; ++e) t += zy[Math.floor(Math.random() * zy.length)];
  return t;
}
var Vy,
  Zx,
  Qx,
  zy,
  Bu = q(() => {
    'use strict';
    (Vy = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      (Zx = '0123456789'),
      (Qx = Vy.toLowerCase()),
      (zy = Vy + Qx + Zx);
  });
var dt = E((qe) => {
  'use strict';
  var ju = require('path');
  Sr();
  try {
    try {
      let t;
      try {
        t = ne('nx/src/utils/app-root').workspaceRoot;
      } catch {
        t = ne('nx/src/utils/workspace-root').workspaceRoot;
      }
      let { getDependencyConfigs: e } = ne('nx/src/tasks-runner/utils'),
        r = ne('nx/tasks-runners/default').default,
        { CompositeLifeCycle: n } = ne('nx/src/tasks-runner/life-cycle'),
        i = null;
      try {
        i = ne('nx/src/index').initTasksRunner;
      } catch {}
      let s;
      try {
        s = ne('nx/src/devkit-exports').cacheDir;
      } catch {
        try {
          s = ne('nx/src/utils/cache-directory').cacheDir;
        } catch {
          s = (0, ju.join)(t, './node_modules/.cache/nx');
        }
      }
      let o = ne('nx/src/tasks-runner/utils').isCacheableTask;
      (qe.cacheDirectory = s),
        (qe.runnerReturnsPromise = !0),
        (qe.tasksRunner = r),
        (qe.CompositeLifeCycle = n),
        (qe.getDependencyConfigs = e),
        (qe.initTasksRunner = i),
        (qe.isCacheableTask = o);
    } catch {
      let { appRootPath: e } = ne('@nrwl/tao/src/utils/app-root'),
        { getDependencyConfigs: r } = ne('@nrwl/workspace/src/tasks-runner/utils'),
        { tasksRunnerV2: n } = ne('@nrwl/workspace/src/tasks-runner/tasks-runner-v2'),
        i;
      try {
        i = ne('@nrwl/workspace/src/tasks-runner/life-cycle').CompositeLifeCycle;
      } catch {}
      let s = ne('@nrwl/workspace/src/tasks-runner/utils').isCacheableTask;
      (qe.cacheDirectory = (0, ju.join)(e, './node_modules/.cache/nx')),
        (qe.runnerReturnsPromise = !1),
        (qe.tasksRunner = n),
        (qe.CompositeLifeCycle = i),
        (qe.getDependencyConfigs = r),
        (qe.initTasksRunner = null),
        (qe.isCacheableTask = s);
    }
  } catch (t) {
    process.env.NX_VERBOSE_LOGGING === 'true' && console.log(t),
      console.error('NX CLOUD ERROR'),
      console.error('---------------------------------------'),
      console.error(
        'This version of Nx Cloud is incompatible with the @nrwl/* and @nx/* packages in your workspace, or Nx was not installed properly.',
      ),
      console.error(''),
      console.error('Verify your install step was successful, and if it was,'),
      console.error(
        'match your @nrwl/nx-cloud version to the same major version of your @nx/* and @nrwl/* packages and try again.',
      ),
      console.error('---------------------------------------'),
      process.exit(1);
  }
});
var Ve = E((Gu) => {
  'use strict';
  Gu.fromCallback = function (t) {
    return Object.defineProperty(
      function () {
        if (typeof arguments[arguments.length - 1] == 'function')
          t.apply(this, arguments);
        else
          return new Promise((e, r) => {
            (arguments[arguments.length] = (n, i) => {
              if (n) return r(n);
              e(i);
            }),
              arguments.length++,
              t.apply(this, arguments);
          });
      },
      'name',
      { value: t.name },
    );
  };
  Gu.fromPromise = function (t) {
    return Object.defineProperty(
      function () {
        let e = arguments[arguments.length - 1];
        if (typeof e != 'function') return t.apply(this, arguments);
        t.apply(this, arguments).then((r) => e(null, r), e);
      },
      'name',
      { value: t.name },
    );
  };
});
var Xy = E((rL, Wy) => {
  'use strict';
  var hr = require('constants'),
    eO = process.cwd,
    xo = null,
    tO = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function () {
    return xo || (xo = eO.call(process)), xo;
  };
  try {
    process.cwd();
  } catch {}
  typeof process.chdir == 'function' &&
    (($u = process.chdir),
    (process.chdir = function (t) {
      (xo = null), $u.call(process, t);
    }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, $u));
  var $u;
  Wy.exports = rO;
  function rO(t) {
    hr.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
      e(t),
      t.lutimes || r(t),
      (t.chown = s(t.chown)),
      (t.fchown = s(t.fchown)),
      (t.lchown = s(t.lchown)),
      (t.chmod = n(t.chmod)),
      (t.fchmod = n(t.fchmod)),
      (t.lchmod = n(t.lchmod)),
      (t.chownSync = o(t.chownSync)),
      (t.fchownSync = o(t.fchownSync)),
      (t.lchownSync = o(t.lchownSync)),
      (t.chmodSync = i(t.chmodSync)),
      (t.fchmodSync = i(t.fchmodSync)),
      (t.lchmodSync = i(t.lchmodSync)),
      (t.stat = a(t.stat)),
      (t.fstat = a(t.fstat)),
      (t.lstat = a(t.lstat)),
      (t.statSync = c(t.statSync)),
      (t.fstatSync = c(t.fstatSync)),
      (t.lstatSync = c(t.lstatSync)),
      t.chmod &&
        !t.lchmod &&
        ((t.lchmod = function (u, f, h) {
          h && process.nextTick(h);
        }),
        (t.lchmodSync = function () {})),
      t.chown &&
        !t.lchown &&
        ((t.lchown = function (u, f, h, d) {
          d && process.nextTick(d);
        }),
        (t.lchownSync = function () {})),
      tO === 'win32' &&
        (t.rename =
          typeof t.rename != 'function'
            ? t.rename
            : (function (u) {
                function f(h, d, p) {
                  var v = Date.now(),
                    m = 0;
                  u(h, d, function w(L) {
                    if (
                      L &&
                      (L.code === 'EACCES' || L.code === 'EPERM' || L.code === 'EBUSY') &&
                      Date.now() - v < 6e4
                    ) {
                      setTimeout(function () {
                        t.stat(d, function (O, N) {
                          O && O.code === 'ENOENT' ? u(h, d, w) : p(L);
                        });
                      }, m),
                        m < 100 && (m += 10);
                      return;
                    }
                    p && p(L);
                  });
                }
                return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
              })(t.rename)),
      (t.read =
        typeof t.read != 'function'
          ? t.read
          : (function (u) {
              function f(h, d, p, v, m, w) {
                var L;
                if (w && typeof w == 'function') {
                  var O = 0;
                  L = function (N, P, I) {
                    if (N && N.code === 'EAGAIN' && O < 10)
                      return O++, u.call(t, h, d, p, v, m, L);
                    w.apply(this, arguments);
                  };
                }
                return u.call(t, h, d, p, v, m, L);
              }
              return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
            })(t.read)),
      (t.readSync =
        typeof t.readSync != 'function'
          ? t.readSync
          : (function (u) {
              return function (f, h, d, p, v) {
                for (var m = 0; ; )
                  try {
                    return u.call(t, f, h, d, p, v);
                  } catch (w) {
                    if (w.code === 'EAGAIN' && m < 10) {
                      m++;
                      continue;
                    }
                    throw w;
                  }
              };
            })(t.readSync));
    function e(u) {
      (u.lchmod = function (f, h, d) {
        u.open(f, hr.O_WRONLY | hr.O_SYMLINK, h, function (p, v) {
          if (p) {
            d && d(p);
            return;
          }
          u.fchmod(v, h, function (m) {
            u.close(v, function (w) {
              d && d(m || w);
            });
          });
        });
      }),
        (u.lchmodSync = function (f, h) {
          var d = u.openSync(f, hr.O_WRONLY | hr.O_SYMLINK, h),
            p = !0,
            v;
          try {
            (v = u.fchmodSync(d, h)), (p = !1);
          } finally {
            if (p)
              try {
                u.closeSync(d);
              } catch {}
            else u.closeSync(d);
          }
          return v;
        });
    }
    function r(u) {
      hr.hasOwnProperty('O_SYMLINK') && u.futimes
        ? ((u.lutimes = function (f, h, d, p) {
            u.open(f, hr.O_SYMLINK, function (v, m) {
              if (v) {
                p && p(v);
                return;
              }
              u.futimes(m, h, d, function (w) {
                u.close(m, function (L) {
                  p && p(w || L);
                });
              });
            });
          }),
          (u.lutimesSync = function (f, h, d) {
            var p = u.openSync(f, hr.O_SYMLINK),
              v,
              m = !0;
            try {
              (v = u.futimesSync(p, h, d)), (m = !1);
            } finally {
              if (m)
                try {
                  u.closeSync(p);
                } catch {}
              else u.closeSync(p);
            }
            return v;
          }))
        : u.futimes &&
          ((u.lutimes = function (f, h, d, p) {
            p && process.nextTick(p);
          }),
          (u.lutimesSync = function () {}));
    }
    function n(u) {
      return (
        u &&
        function (f, h, d) {
          return u.call(t, f, h, function (p) {
            l(p) && (p = null), d && d.apply(this, arguments);
          });
        }
      );
    }
    function i(u) {
      return (
        u &&
        function (f, h) {
          try {
            return u.call(t, f, h);
          } catch (d) {
            if (!l(d)) throw d;
          }
        }
      );
    }
    function s(u) {
      return (
        u &&
        function (f, h, d, p) {
          return u.call(t, f, h, d, function (v) {
            l(v) && (v = null), p && p.apply(this, arguments);
          });
        }
      );
    }
    function o(u) {
      return (
        u &&
        function (f, h, d) {
          try {
            return u.call(t, f, h, d);
          } catch (p) {
            if (!l(p)) throw p;
          }
        }
      );
    }
    function a(u) {
      return (
        u &&
        function (f, h, d) {
          typeof h == 'function' && ((d = h), (h = null));
          function p(v, m) {
            m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)),
              d && d.apply(this, arguments);
          }
          return h ? u.call(t, f, h, p) : u.call(t, f, p);
        }
      );
    }
    function c(u) {
      return (
        u &&
        function (f, h) {
          var d = h ? u.call(t, f, h) : u.call(t, f);
          return (
            d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)),
            d
          );
        }
      );
    }
    function l(u) {
      if (!u || u.code === 'ENOSYS') return !0;
      var f = !process.getuid || process.getuid() !== 0;
      return !!(f && (u.code === 'EINVAL' || u.code === 'EPERM'));
    }
  }
});
var Jy = E((nL, Yy) => {
  'use strict';
  var Ky = require('stream').Stream;
  Yy.exports = nO;
  function nO(t) {
    return { ReadStream: e, WriteStream: r };
    function e(n, i) {
      if (!(this instanceof e)) return new e(n, i);
      Ky.call(this);
      var s = this;
      (this.path = n),
        (this.fd = null),
        (this.readable = !0),
        (this.paused = !1),
        (this.flags = 'r'),
        (this.mode = 438),
        (this.bufferSize = 64 * 1024),
        (i = i || {});
      for (var o = Object.keys(i), a = 0, c = o.length; a < c; a++) {
        var l = o[a];
        this[l] = i[l];
      }
      if ((this.encoding && this.setEncoding(this.encoding), this.start !== void 0)) {
        if (typeof this.start != 'number') throw TypeError('start must be a Number');
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end != 'number') throw TypeError('end must be a Number');
        if (this.start > this.end) throw new Error('start must be <= end');
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function () {
          s._read();
        });
        return;
      }
      t.open(this.path, this.flags, this.mode, function (u, f) {
        if (u) {
          s.emit('error', u), (s.readable = !1);
          return;
        }
        (s.fd = f), s.emit('open', f), s._read();
      });
    }
    function r(n, i) {
      if (!(this instanceof r)) return new r(n, i);
      Ky.call(this),
        (this.path = n),
        (this.fd = null),
        (this.writable = !0),
        (this.flags = 'w'),
        (this.encoding = 'binary'),
        (this.mode = 438),
        (this.bytesWritten = 0),
        (i = i || {});
      for (var s = Object.keys(i), o = 0, a = s.length; o < a; o++) {
        var c = s[o];
        this[c] = i[c];
      }
      if (this.start !== void 0) {
        if (typeof this.start != 'number') throw TypeError('start must be a Number');
        if (this.start < 0) throw new Error('start must be >= zero');
        this.pos = this.start;
      }
      (this.busy = !1),
        (this._queue = []),
        this.fd === null &&
          ((this._open = t.open),
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
          this.flush());
    }
  }
});
var Qy = E((iL, Zy) => {
  'use strict';
  Zy.exports = sO;
  var iO =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    };
  function sO(t) {
    if (t === null || typeof t != 'object') return t;
    if (t instanceof Object) var e = { __proto__: iO(t) };
    else var e = Object.create(null);
    return (
      Object.getOwnPropertyNames(t).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      }),
      e
    );
  }
});
var ge = E((sL, Vu) => {
  'use strict';
  var ue = require('fs'),
    oO = Xy(),
    aO = Jy(),
    cO = Qy(),
    Oo = require('util'),
    we,
    Co;
  typeof Symbol == 'function' && typeof Symbol.for == 'function'
    ? ((we = Symbol.for('graceful-fs.queue')), (Co = Symbol.for('graceful-fs.previous')))
    : ((we = '___graceful-fs.queue'), (Co = '___graceful-fs.previous'));
  function uO() {}
  function rE(t, e) {
    Object.defineProperty(t, we, {
      get: function () {
        return e;
      },
    });
  }
  var $r = uO;
  Oo.debuglog
    ? ($r = Oo.debuglog('gfs4'))
    : /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
      ($r = function () {
        var t = Oo.format.apply(Oo, arguments);
        (t =
          'GFS4: ' +
          t.split(/\n/).join(`
GFS4: `)),
          console.error(t);
      });
  ue[we] ||
    ((eE = global[we] || []),
    rE(ue, eE),
    (ue.close = (function (t) {
      function e(r, n) {
        return t.call(ue, r, function (i) {
          i || tE(), typeof n == 'function' && n.apply(this, arguments);
        });
      }
      return Object.defineProperty(e, Co, { value: t }), e;
    })(ue.close)),
    (ue.closeSync = (function (t) {
      function e(r) {
        t.apply(ue, arguments), tE();
      }
      return Object.defineProperty(e, Co, { value: t }), e;
    })(ue.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
      process.on('exit', function () {
        $r(ue[we]), require('assert').equal(ue[we].length, 0);
      }));
  var eE;
  global[we] || rE(global, ue[we]);
  Vu.exports = Hu(cO(ue));
  process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
    !ue.__patched &&
    ((Vu.exports = Hu(ue)), (ue.__patched = !0));
  function Hu(t) {
    oO(t), (t.gracefulify = Hu), (t.createReadStream = P), (t.createWriteStream = I);
    var e = t.readFile;
    t.readFile = r;
    function r(T, C, j) {
      return typeof C == 'function' && ((j = C), (C = null)), X(T, C, j);
      function X(V, J, B, K) {
        return e(V, J, function ($) {
          $ && ($.code === 'EMFILE' || $.code === 'ENFILE')
            ? Ln([X, [V, J, B], $, K || Date.now(), Date.now()])
            : typeof B == 'function' && B.apply(this, arguments);
        });
      }
    }
    var n = t.writeFile;
    t.writeFile = i;
    function i(T, C, j, X) {
      return typeof j == 'function' && ((X = j), (j = null)), V(T, C, j, X);
      function V(J, B, K, $, k) {
        return n(J, B, K, function (H) {
          H && (H.code === 'EMFILE' || H.code === 'ENFILE')
            ? Ln([V, [J, B, K, $], H, k || Date.now(), Date.now()])
            : typeof $ == 'function' && $.apply(this, arguments);
        });
      }
    }
    var s = t.appendFile;
    s && (t.appendFile = o);
    function o(T, C, j, X) {
      return typeof j == 'function' && ((X = j), (j = null)), V(T, C, j, X);
      function V(J, B, K, $, k) {
        return s(J, B, K, function (H) {
          H && (H.code === 'EMFILE' || H.code === 'ENFILE')
            ? Ln([V, [J, B, K, $], H, k || Date.now(), Date.now()])
            : typeof $ == 'function' && $.apply(this, arguments);
        });
      }
    }
    var a = t.copyFile;
    a && (t.copyFile = c);
    function c(T, C, j, X) {
      return typeof j == 'function' && ((X = j), (j = 0)), V(T, C, j, X);
      function V(J, B, K, $, k) {
        return a(J, B, K, function (H) {
          H && (H.code === 'EMFILE' || H.code === 'ENFILE')
            ? Ln([V, [J, B, K, $], H, k || Date.now(), Date.now()])
            : typeof $ == 'function' && $.apply(this, arguments);
        });
      }
    }
    var l = t.readdir;
    t.readdir = f;
    var u = /^v[0-5]\./;
    function f(T, C, j) {
      typeof C == 'function' && ((j = C), (C = null));
      var X = u.test(process.version)
        ? function (B, K, $, k) {
            return l(B, V(B, K, $, k));
          }
        : function (B, K, $, k) {
            return l(B, K, V(B, K, $, k));
          };
      return X(T, C, j);
      function V(J, B, K, $) {
        return function (k, H) {
          k && (k.code === 'EMFILE' || k.code === 'ENFILE')
            ? Ln([X, [J, B, K], k, $ || Date.now(), Date.now()])
            : (H && H.sort && H.sort(), typeof K == 'function' && K.call(this, k, H));
        };
      }
    }
    if (process.version.substr(0, 4) === 'v0.8') {
      var h = aO(t);
      (w = h.ReadStream), (O = h.WriteStream);
    }
    var d = t.ReadStream;
    d && ((w.prototype = Object.create(d.prototype)), (w.prototype.open = L));
    var p = t.WriteStream;
    p && ((O.prototype = Object.create(p.prototype)), (O.prototype.open = N)),
      Object.defineProperty(t, 'ReadStream', {
        get: function () {
          return w;
        },
        set: function (T) {
          w = T;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, 'WriteStream', {
        get: function () {
          return O;
        },
        set: function (T) {
          O = T;
        },
        enumerable: !0,
        configurable: !0,
      });
    var v = w;
    Object.defineProperty(t, 'FileReadStream', {
      get: function () {
        return v;
      },
      set: function (T) {
        v = T;
      },
      enumerable: !0,
      configurable: !0,
    });
    var m = O;
    Object.defineProperty(t, 'FileWriteStream', {
      get: function () {
        return m;
      },
      set: function (T) {
        m = T;
      },
      enumerable: !0,
      configurable: !0,
    });
    function w(T, C) {
      return this instanceof w
        ? (d.apply(this, arguments), this)
        : w.apply(Object.create(w.prototype), arguments);
    }
    function L() {
      var T = this;
      G(T.path, T.flags, T.mode, function (C, j) {
        C
          ? (T.autoClose && T.destroy(), T.emit('error', C))
          : ((T.fd = j), T.emit('open', j), T.read());
      });
    }
    function O(T, C) {
      return this instanceof O
        ? (p.apply(this, arguments), this)
        : O.apply(Object.create(O.prototype), arguments);
    }
    function N() {
      var T = this;
      G(T.path, T.flags, T.mode, function (C, j) {
        C ? (T.destroy(), T.emit('error', C)) : ((T.fd = j), T.emit('open', j));
      });
    }
    function P(T, C) {
      return new t.ReadStream(T, C);
    }
    function I(T, C) {
      return new t.WriteStream(T, C);
    }
    var z = t.open;
    t.open = G;
    function G(T, C, j, X) {
      return typeof j == 'function' && ((X = j), (j = null)), V(T, C, j, X);
      function V(J, B, K, $, k) {
        return z(J, B, K, function (H, le) {
          H && (H.code === 'EMFILE' || H.code === 'ENFILE')
            ? Ln([V, [J, B, K, $], H, k || Date.now(), Date.now()])
            : typeof $ == 'function' && $.apply(this, arguments);
        });
      }
    }
    return t;
  }
  function Ln(t) {
    $r('ENQUEUE', t[0].name, t[1]), ue[we].push(t), zu();
  }
  var To;
  function tE() {
    for (var t = Date.now(), e = 0; e < ue[we].length; ++e)
      ue[we][e].length > 2 && ((ue[we][e][3] = t), (ue[we][e][4] = t));
    zu();
  }
  function zu() {
    if ((clearTimeout(To), (To = void 0), ue[we].length !== 0)) {
      var t = ue[we].shift(),
        e = t[0],
        r = t[1],
        n = t[2],
        i = t[3],
        s = t[4];
      if (i === void 0) $r('RETRY', e.name, r), e.apply(null, r);
      else if (Date.now() - i >= 6e4) {
        $r('TIMEOUT', e.name, r);
        var o = r.pop();
        typeof o == 'function' && o.call(null, n);
      } else {
        var a = Date.now() - s,
          c = Math.max(s - i, 1),
          l = Math.min(c * 1.2, 100);
        a >= l ? ($r('RETRY', e.name, r), e.apply(null, r.concat([i]))) : ue[we].push(t);
      }
      To === void 0 && (To = setTimeout(zu, 0));
    }
  }
});
var Wu = E((kn) => {
  'use strict';
  var lO = Ve().fromCallback,
    Ot = ge(),
    fO = [
      'access',
      'appendFile',
      'chmod',
      'chown',
      'close',
      'copyFile',
      'fchmod',
      'fchown',
      'fdatasync',
      'fstat',
      'fsync',
      'ftruncate',
      'futimes',
      'lchown',
      'lchmod',
      'link',
      'lstat',
      'mkdir',
      'mkdtemp',
      'open',
      'readFile',
      'readdir',
      'readlink',
      'realpath',
      'rename',
      'rmdir',
      'stat',
      'symlink',
      'truncate',
      'unlink',
      'utimes',
      'writeFile',
    ].filter((t) => typeof Ot[t] == 'function');
  Object.keys(Ot).forEach((t) => {
    t !== 'promises' && (kn[t] = Ot[t]);
  });
  fO.forEach((t) => {
    kn[t] = lO(Ot[t]);
  });
  kn.exists = function (t, e) {
    return typeof e == 'function' ? Ot.exists(t, e) : new Promise((r) => Ot.exists(t, r));
  };
  kn.read = function (t, e, r, n, i, s) {
    return typeof s == 'function'
      ? Ot.read(t, e, r, n, i, s)
      : new Promise((o, a) => {
          Ot.read(t, e, r, n, i, (c, l, u) => {
            if (c) return a(c);
            o({ bytesRead: l, buffer: u });
          });
        });
  };
  kn.write = function (t, e, ...r) {
    return typeof r[r.length - 1] == 'function'
      ? Ot.write(t, e, ...r)
      : new Promise((n, i) => {
          Ot.write(t, e, ...r, (s, o, a) => {
            if (s) return i(s);
            n({ bytesWritten: o, buffer: a });
          });
        });
  };
});
var Ku = E((aL, iE) => {
  'use strict';
  var Xu = require('path');
  function nE(t) {
    return (t = Xu.normalize(Xu.resolve(t)).split(Xu.sep)), t.length > 0 ? t[0] : null;
  }
  var hO = /[<>:"|?*]/;
  function dO(t) {
    let e = nE(t);
    return (t = t.replace(e, '')), hO.test(t);
  }
  iE.exports = { getRootPath: nE, invalidWin32Path: dO };
});
var oE = E((cL, sE) => {
  'use strict';
  var pO = ge(),
    Yu = require('path'),
    mO = Ku().invalidWin32Path,
    yO = parseInt('0777', 8);
  function Ju(t, e, r, n) {
    if (
      (typeof e == 'function'
        ? ((r = e), (e = {}))
        : (!e || typeof e != 'object') && (e = { mode: e }),
      process.platform === 'win32' && mO(t))
    ) {
      let o = new Error(t + ' contains invalid WIN32 path characters.');
      return (o.code = 'EINVAL'), r(o);
    }
    let i = e.mode,
      s = e.fs || pO;
    i === void 0 && (i = yO & ~process.umask()),
      n || (n = null),
      (r = r || function () {}),
      (t = Yu.resolve(t)),
      s.mkdir(t, i, (o) => {
        if (!o) return (n = n || t), r(null, n);
        switch (o.code) {
          case 'ENOENT':
            if (Yu.dirname(t) === t) return r(o);
            Ju(Yu.dirname(t), e, (a, c) => {
              a ? r(a, c) : Ju(t, e, r, c);
            });
            break;
          default:
            s.stat(t, (a, c) => {
              a || !c.isDirectory() ? r(o, n) : r(null, n);
            });
            break;
        }
      });
  }
  sE.exports = Ju;
});
var cE = E((uL, aE) => {
  'use strict';
  var EO = ge(),
    Zu = require('path'),
    gO = Ku().invalidWin32Path,
    _O = parseInt('0777', 8);
  function Qu(t, e, r) {
    (!e || typeof e != 'object') && (e = { mode: e });
    let n = e.mode,
      i = e.fs || EO;
    if (process.platform === 'win32' && gO(t)) {
      let s = new Error(t + ' contains invalid WIN32 path characters.');
      throw ((s.code = 'EINVAL'), s);
    }
    n === void 0 && (n = _O & ~process.umask()), r || (r = null), (t = Zu.resolve(t));
    try {
      i.mkdirSync(t, n), (r = r || t);
    } catch (s) {
      if (s.code === 'ENOENT') {
        if (Zu.dirname(t) === t) throw s;
        (r = Qu(Zu.dirname(t), e, r)), Qu(t, e, r);
      } else {
        let o;
        try {
          o = i.statSync(t);
        } catch {
          throw s;
        }
        if (!o.isDirectory()) throw s;
      }
    }
    return r;
  }
  aE.exports = Qu;
});
var Qe = E((lL, uE) => {
  'use strict';
  var bO = Ve().fromCallback,
    el = bO(oE()),
    tl = cE();
  uE.exports = {
    mkdirs: el,
    mkdirsSync: tl,
    mkdirp: el,
    mkdirpSync: tl,
    ensureDir: el,
    ensureDirSync: tl,
  };
});
var rl = E((fL, fE) => {
  'use strict';
  var ke = ge(),
    lE = require('os'),
    Io = require('path');
  function vO() {
    let t = Io.join(
      'millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2),
    );
    t = Io.join(lE.tmpdir(), t);
    let e = new Date(1435410243862);
    ke.writeFileSync(t, 'https://github.com/jprichardson/node-fs-extra/pull/141');
    let r = ke.openSync(t, 'r+');
    return ke.futimesSync(r, e, e), ke.closeSync(r), ke.statSync(t).mtime > 1435410243e3;
  }
  function SO(t) {
    let e = Io.join(
      'millis-test' + Date.now().toString() + Math.random().toString().slice(2),
    );
    e = Io.join(lE.tmpdir(), e);
    let r = new Date(1435410243862);
    ke.writeFile(e, 'https://github.com/jprichardson/node-fs-extra/pull/141', (n) => {
      if (n) return t(n);
      ke.open(e, 'r+', (i, s) => {
        if (i) return t(i);
        ke.futimes(s, r, r, (o) => {
          if (o) return t(o);
          ke.close(s, (a) => {
            if (a) return t(a);
            ke.stat(e, (c, l) => {
              if (c) return t(c);
              t(null, l.mtime > 1435410243e3);
            });
          });
        });
      });
    });
  }
  function wO(t) {
    if (typeof t == 'number') return Math.floor(t / 1e3) * 1e3;
    if (t instanceof Date) return new Date(Math.floor(t.getTime() / 1e3) * 1e3);
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type');
  }
  function RO(t, e, r, n) {
    ke.open(t, 'r+', (i, s) => {
      if (i) return n(i);
      ke.futimes(s, e, r, (o) => {
        ke.close(s, (a) => {
          n && n(o || a);
        });
      });
    });
  }
  function xO(t, e, r) {
    let n = ke.openSync(t, 'r+');
    return ke.futimesSync(n, e, r), ke.closeSync(n);
  }
  fE.exports = {
    hasMillisRes: SO,
    hasMillisResSync: vO,
    timeRemoveMillis: wO,
    utimesMillis: RO,
    utimesMillisSync: xO,
  };
});
var nl = E((hL, hE) => {
  'use strict';
  hE.exports = function (t) {
    if (typeof Buffer.allocUnsafe == 'function')
      try {
        return Buffer.allocUnsafe(t);
      } catch {
        return new Buffer(t);
      }
    return new Buffer(t);
  };
});
var gE = E((dL, EE) => {
  'use strict';
  var oe = ge(),
    Gt = require('path'),
    OO = Qe().mkdirsSync,
    TO = rl().utimesMillisSync,
    No = Symbol('notExist');
  function CO(t, e, r) {
    typeof r == 'function' && (r = { filter: r }),
      (r = r || {}),
      (r.clobber = 'clobber' in r ? !!r.clobber : !0),
      (r.overwrite = 'overwrite' in r ? !!r.overwrite : r.clobber),
      r.preserveTimestamps &&
        process.arch === 'ia32' &&
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
    let n = yE(t, e);
    if (r.filter && !r.filter(t, e)) return;
    let i = Gt.dirname(e);
    return oe.existsSync(i) || OO(i), dE(n, t, e, r);
  }
  function dE(t, e, r, n) {
    if (!(n.filter && !n.filter(e, r))) return IO(t, e, r, n);
  }
  function IO(t, e, r, n) {
    let s = (n.dereference ? oe.statSync : oe.lstatSync)(e);
    if (s.isDirectory()) return LO(s, t, e, r, n);
    if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice())
      return NO(s, t, e, r, n);
    if (s.isSymbolicLink()) return UO(t, e, r, n);
  }
  function NO(t, e, r, n, i) {
    return e === No ? pE(t, r, n, i) : AO(t, r, n, i);
  }
  function AO(t, e, r, n) {
    if (n.overwrite) return oe.unlinkSync(r), pE(t, e, r, n);
    if (n.errorOnExist) throw new Error(`'${r}' already exists`);
  }
  function pE(t, e, r, n) {
    return typeof oe.copyFileSync == 'function'
      ? (oe.copyFileSync(e, r),
        oe.chmodSync(r, t.mode),
        n.preserveTimestamps ? TO(r, t.atime, t.mtime) : void 0)
      : DO(t, e, r, n);
  }
  function DO(t, e, r, n) {
    let s = nl()(65536),
      o = oe.openSync(e, 'r'),
      a = oe.openSync(r, 'w', t.mode),
      c = 0;
    for (; c < t.size; ) {
      let l = oe.readSync(o, s, 0, 65536, c);
      oe.writeSync(a, s, 0, l), (c += l);
    }
    n.preserveTimestamps && oe.futimesSync(a, t.atime, t.mtime),
      oe.closeSync(o),
      oe.closeSync(a);
  }
  function LO(t, e, r, n, i) {
    if (e === No) return kO(t, r, n, i);
    if (e && !e.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`);
    return mE(r, n, i);
  }
  function kO(t, e, r, n) {
    return oe.mkdirSync(r), mE(e, r, n), oe.chmodSync(r, t.mode);
  }
  function mE(t, e, r) {
    oe.readdirSync(t).forEach((n) => PO(n, t, e, r));
  }
  function PO(t, e, r, n) {
    let i = Gt.join(e, t),
      s = Gt.join(r, t),
      o = yE(i, s);
    return dE(o, i, s, n);
  }
  function UO(t, e, r, n) {
    let i = oe.readlinkSync(e);
    if ((n.dereference && (i = Gt.resolve(process.cwd(), i)), t === No))
      return oe.symlinkSync(i, r);
    {
      let s;
      try {
        s = oe.readlinkSync(r);
      } catch (o) {
        if (o.code === 'EINVAL' || o.code === 'UNKNOWN') return oe.symlinkSync(i, r);
        throw o;
      }
      if ((n.dereference && (s = Gt.resolve(process.cwd(), s)), il(i, s)))
        throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
      if (oe.statSync(r).isDirectory() && il(s, i))
        throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
      return FO(i, r);
    }
  }
  function FO(t, e) {
    return oe.unlinkSync(e), oe.symlinkSync(t, e);
  }
  function il(t, e) {
    let r = Gt.resolve(t).split(Gt.sep),
      n = Gt.resolve(e).split(Gt.sep);
    return r.reduce((i, s, o) => i && n[o] === s, !0);
  }
  function MO(t, e) {
    let r = oe.statSync(t),
      n;
    try {
      n = oe.statSync(e);
    } catch (i) {
      if (i.code === 'ENOENT') return { srcStat: r, destStat: No };
      throw i;
    }
    return { srcStat: r, destStat: n };
  }
  function yE(t, e) {
    let { srcStat: r, destStat: n } = MO(t, e);
    if (n.ino && n.ino === r.ino)
      throw new Error('Source and destination must not be the same.');
    if (r.isDirectory() && il(t, e))
      throw new Error(`Cannot copy '${t}' to a subdirectory of itself, '${e}'.`);
    return n;
  }
  EE.exports = CO;
});
var sl = E((pL, _E) => {
  'use strict';
  _E.exports = { copySync: gE() };
});
var Tt = E((mL, vE) => {
  'use strict';
  var qO = Ve().fromPromise,
    bE = Wu();
  function BO(t) {
    return bE
      .access(t)
      .then(() => !0)
      .catch(() => !1);
  }
  vE.exports = { pathExists: qO(BO), pathExistsSync: bE.existsSync };
});
var AE = E((yL, NE) => {
  'use strict';
  var he = ge(),
    $t = require('path'),
    jO = Qe().mkdirs,
    GO = Tt().pathExists,
    $O = rl().utimesMillis,
    Ao = Symbol('notExist');
  function HO(t, e, r, n) {
    typeof r == 'function' && !n
      ? ((n = r), (r = {}))
      : typeof r == 'function' && (r = { filter: r }),
      (n = n || function () {}),
      (r = r || {}),
      (r.clobber = 'clobber' in r ? !!r.clobber : !0),
      (r.overwrite = 'overwrite' in r ? !!r.overwrite : r.clobber),
      r.preserveTimestamps &&
        process.arch === 'ia32' &&
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`),
      IE(t, e, (i, s) =>
        i ? n(i) : r.filter ? RE(SE, s, t, e, r, n) : SE(s, t, e, r, n),
      );
  }
  function SE(t, e, r, n, i) {
    let s = $t.dirname(r);
    GO(s, (o, a) => {
      if (o) return i(o);
      if (a) return ol(t, e, r, n, i);
      jO(s, (c) => (c ? i(c) : ol(t, e, r, n, i)));
    });
  }
  function RE(t, e, r, n, i, s) {
    Promise.resolve(i.filter(r, n)).then(
      (o) => (o ? (e ? t(e, r, n, i, s) : t(r, n, i, s)) : s()),
      (o) => s(o),
    );
  }
  function ol(t, e, r, n, i) {
    return n.filter ? RE(wE, t, e, r, n, i) : wE(t, e, r, n, i);
  }
  function wE(t, e, r, n, i) {
    (n.dereference ? he.stat : he.lstat)(e, (o, a) => {
      if (o) return i(o);
      if (a.isDirectory()) return XO(a, t, e, r, n, i);
      if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice())
        return zO(a, t, e, r, n, i);
      if (a.isSymbolicLink()) return JO(t, e, r, n, i);
    });
  }
  function zO(t, e, r, n, i, s) {
    return e === Ao ? xE(t, r, n, i, s) : VO(t, r, n, i, s);
  }
  function VO(t, e, r, n, i) {
    if (n.overwrite) he.unlink(r, (s) => (s ? i(s) : xE(t, e, r, n, i)));
    else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
  }
  function xE(t, e, r, n, i) {
    return typeof he.copyFile == 'function'
      ? he.copyFile(e, r, (s) => (s ? i(s) : OE(t, r, n, i)))
      : WO(t, e, r, n, i);
  }
  function WO(t, e, r, n, i) {
    let s = he.createReadStream(e);
    s.on('error', (o) => i(o)).once('open', () => {
      let o = he.createWriteStream(r, { mode: t.mode });
      o.on('error', (a) => i(a))
        .on('open', () => s.pipe(o))
        .once('close', () => OE(t, r, n, i));
    });
  }
  function OE(t, e, r, n) {
    he.chmod(e, t.mode, (i) =>
      i ? n(i) : r.preserveTimestamps ? $O(e, t.atime, t.mtime, n) : n(),
    );
  }
  function XO(t, e, r, n, i, s) {
    return e === Ao
      ? KO(t, r, n, i, s)
      : e && !e.isDirectory()
      ? s(new Error(`Cannot overwrite non-directory '${n}' with directory '${r}'.`))
      : TE(r, n, i, s);
  }
  function KO(t, e, r, n, i) {
    he.mkdir(r, (s) => {
      if (s) return i(s);
      TE(e, r, n, (o) => (o ? i(o) : he.chmod(r, t.mode, i)));
    });
  }
  function TE(t, e, r, n) {
    he.readdir(t, (i, s) => (i ? n(i) : CE(s, t, e, r, n)));
  }
  function CE(t, e, r, n, i) {
    let s = t.pop();
    return s ? YO(t, s, e, r, n, i) : i();
  }
  function YO(t, e, r, n, i, s) {
    let o = $t.join(r, e),
      a = $t.join(n, e);
    IE(o, a, (c, l) => {
      if (c) return s(c);
      ol(l, o, a, i, (u) => (u ? s(u) : CE(t, r, n, i, s)));
    });
  }
  function JO(t, e, r, n, i) {
    he.readlink(e, (s, o) => {
      if (s) return i(s);
      if ((n.dereference && (o = $t.resolve(process.cwd(), o)), t === Ao))
        return he.symlink(o, r, i);
      he.readlink(r, (a, c) =>
        a
          ? a.code === 'EINVAL' || a.code === 'UNKNOWN'
            ? he.symlink(o, r, i)
            : i(a)
          : (n.dereference && (c = $t.resolve(process.cwd(), c)),
            al(o, c)
              ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`))
              : t.isDirectory() && al(c, o)
              ? i(new Error(`Cannot overwrite '${c}' with '${o}'.`))
              : ZO(o, r, i)),
      );
    });
  }
  function ZO(t, e, r) {
    he.unlink(e, (n) => (n ? r(n) : he.symlink(t, e, r)));
  }
  function al(t, e) {
    let r = $t.resolve(t).split($t.sep),
      n = $t.resolve(e).split($t.sep);
    return r.reduce((i, s, o) => i && n[o] === s, !0);
  }
  function QO(t, e, r) {
    he.stat(t, (n, i) => {
      if (n) return r(n);
      he.stat(e, (s, o) =>
        s
          ? s.code === 'ENOENT'
            ? r(null, { srcStat: i, destStat: Ao })
            : r(s)
          : r(null, { srcStat: i, destStat: o }),
      );
    });
  }
  function IE(t, e, r) {
    QO(t, e, (n, i) => {
      if (n) return r(n);
      let { srcStat: s, destStat: o } = i;
      return o.ino && o.ino === s.ino
        ? r(new Error('Source and destination must not be the same.'))
        : s.isDirectory() && al(t, e)
        ? r(new Error(`Cannot copy '${t}' to a subdirectory of itself, '${e}'.`))
        : r(null, o);
    });
  }
  NE.exports = HO;
});
var cl = E((EL, DE) => {
  'use strict';
  var eT = Ve().fromCallback;
  DE.exports = { copy: eT(AE()) };
});
var jE = E((gL, BE) => {
  'use strict';
  var LE = ge(),
    FE = require('path'),
    ee = require('assert'),
    Si = process.platform === 'win32';
  function ME(t) {
    ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'].forEach((r) => {
      (t[r] = t[r] || LE[r]), (r = r + 'Sync'), (t[r] = t[r] || LE[r]);
    }),
      (t.maxBusyTries = t.maxBusyTries || 3);
  }
  function ul(t, e, r) {
    let n = 0;
    typeof e == 'function' && ((r = e), (e = {})),
      ee(t, 'rimraf: missing path'),
      ee.strictEqual(typeof t, 'string', 'rimraf: path should be a string'),
      ee.strictEqual(typeof r, 'function', 'rimraf: callback function required'),
      ee(e, 'rimraf: invalid options argument provided'),
      ee.strictEqual(typeof e, 'object', 'rimraf: options should be object'),
      ME(e),
      kE(t, e, function i(s) {
        if (s) {
          if (
            (s.code === 'EBUSY' || s.code === 'ENOTEMPTY' || s.code === 'EPERM') &&
            n < e.maxBusyTries
          ) {
            n++;
            let o = n * 100;
            return setTimeout(() => kE(t, e, i), o);
          }
          s.code === 'ENOENT' && (s = null);
        }
        r(s);
      });
  }
  function kE(t, e, r) {
    ee(t),
      ee(e),
      ee(typeof r == 'function'),
      e.lstat(t, (n, i) => {
        if (n && n.code === 'ENOENT') return r(null);
        if (n && n.code === 'EPERM' && Si) return PE(t, e, n, r);
        if (i && i.isDirectory()) return Do(t, e, n, r);
        e.unlink(t, (s) => {
          if (s) {
            if (s.code === 'ENOENT') return r(null);
            if (s.code === 'EPERM') return Si ? PE(t, e, s, r) : Do(t, e, s, r);
            if (s.code === 'EISDIR') return Do(t, e, s, r);
          }
          return r(s);
        });
      });
  }
  function PE(t, e, r, n) {
    ee(t),
      ee(e),
      ee(typeof n == 'function'),
      r && ee(r instanceof Error),
      e.chmod(t, 438, (i) => {
        i
          ? n(i.code === 'ENOENT' ? null : r)
          : e.stat(t, (s, o) => {
              s
                ? n(s.code === 'ENOENT' ? null : r)
                : o.isDirectory()
                ? Do(t, e, r, n)
                : e.unlink(t, n);
            });
      });
  }
  function UE(t, e, r) {
    let n;
    ee(t), ee(e), r && ee(r instanceof Error);
    try {
      e.chmodSync(t, 438);
    } catch (i) {
      if (i.code === 'ENOENT') return;
      throw r;
    }
    try {
      n = e.statSync(t);
    } catch (i) {
      if (i.code === 'ENOENT') return;
      throw r;
    }
    n.isDirectory() ? Lo(t, e, r) : e.unlinkSync(t);
  }
  function Do(t, e, r, n) {
    ee(t),
      ee(e),
      r && ee(r instanceof Error),
      ee(typeof n == 'function'),
      e.rmdir(t, (i) => {
        i && (i.code === 'ENOTEMPTY' || i.code === 'EEXIST' || i.code === 'EPERM')
          ? tT(t, e, n)
          : i && i.code === 'ENOTDIR'
          ? n(r)
          : n(i);
      });
  }
  function tT(t, e, r) {
    ee(t),
      ee(e),
      ee(typeof r == 'function'),
      e.readdir(t, (n, i) => {
        if (n) return r(n);
        let s = i.length,
          o;
        if (s === 0) return e.rmdir(t, r);
        i.forEach((a) => {
          ul(FE.join(t, a), e, (c) => {
            if (!o) {
              if (c) return r((o = c));
              --s === 0 && e.rmdir(t, r);
            }
          });
        });
      });
  }
  function qE(t, e) {
    let r;
    (e = e || {}),
      ME(e),
      ee(t, 'rimraf: missing path'),
      ee.strictEqual(typeof t, 'string', 'rimraf: path should be a string'),
      ee(e, 'rimraf: missing options'),
      ee.strictEqual(typeof e, 'object', 'rimraf: options should be object');
    try {
      r = e.lstatSync(t);
    } catch (n) {
      if (n.code === 'ENOENT') return;
      n.code === 'EPERM' && Si && UE(t, e, n);
    }
    try {
      r && r.isDirectory() ? Lo(t, e, null) : e.unlinkSync(t);
    } catch (n) {
      if (n.code === 'ENOENT') return;
      if (n.code === 'EPERM') return Si ? UE(t, e, n) : Lo(t, e, n);
      if (n.code !== 'EISDIR') throw n;
      Lo(t, e, n);
    }
  }
  function Lo(t, e, r) {
    ee(t), ee(e), r && ee(r instanceof Error);
    try {
      e.rmdirSync(t);
    } catch (n) {
      if (n.code === 'ENOTDIR') throw r;
      if (n.code === 'ENOTEMPTY' || n.code === 'EEXIST' || n.code === 'EPERM') rT(t, e);
      else if (n.code !== 'ENOENT') throw n;
    }
  }
  function rT(t, e) {
    if ((ee(t), ee(e), e.readdirSync(t).forEach((r) => qE(FE.join(t, r), e)), Si)) {
      let r = Date.now();
      do
        try {
          return e.rmdirSync(t, e);
        } catch {}
      while (Date.now() - r < 500);
    } else return e.rmdirSync(t, e);
  }
  BE.exports = ul;
  ul.sync = qE;
});
var wi = E((_L, $E) => {
  'use strict';
  var nT = Ve().fromCallback,
    GE = jE();
  $E.exports = { remove: nT(GE), removeSync: GE.sync };
});
var JE = E((bL, YE) => {
  'use strict';
  var iT = Ve().fromCallback,
    VE = require('fs'),
    WE = require('path'),
    XE = Qe(),
    KE = wi(),
    HE = iT(function (e, r) {
      (r = r || function () {}),
        VE.readdir(e, (n, i) => {
          if (n) return XE.mkdirs(e, r);
          (i = i.map((o) => WE.join(e, o))), s();
          function s() {
            let o = i.pop();
            if (!o) return r();
            KE.remove(o, (a) => {
              if (a) return r(a);
              s();
            });
          }
        });
    });
  function zE(t) {
    let e;
    try {
      e = VE.readdirSync(t);
    } catch {
      return XE.mkdirsSync(t);
    }
    e.forEach((r) => {
      (r = WE.join(t, r)), KE.removeSync(r);
    });
  }
  YE.exports = { emptyDirSync: zE, emptydirSync: zE, emptyDir: HE, emptydir: HE };
});
var tg = E((vL, eg) => {
  'use strict';
  var sT = Ve().fromCallback,
    ZE = require('path'),
    Ri = ge(),
    QE = Qe(),
    oT = Tt().pathExists;
  function aT(t, e) {
    function r() {
      Ri.writeFile(t, '', (n) => {
        if (n) return e(n);
        e();
      });
    }
    Ri.stat(t, (n, i) => {
      if (!n && i.isFile()) return e();
      let s = ZE.dirname(t);
      oT(s, (o, a) => {
        if (o) return e(o);
        if (a) return r();
        QE.mkdirs(s, (c) => {
          if (c) return e(c);
          r();
        });
      });
    });
  }
  function cT(t) {
    let e;
    try {
      e = Ri.statSync(t);
    } catch {}
    if (e && e.isFile()) return;
    let r = ZE.dirname(t);
    Ri.existsSync(r) || QE.mkdirsSync(r), Ri.writeFileSync(t, '');
  }
  eg.exports = { createFile: sT(aT), createFileSync: cT };
});
var og = E((SL, sg) => {
  'use strict';
  var uT = Ve().fromCallback,
    ng = require('path'),
    Hr = ge(),
    ig = Qe(),
    rg = Tt().pathExists;
  function lT(t, e, r) {
    function n(i, s) {
      Hr.link(i, s, (o) => {
        if (o) return r(o);
        r(null);
      });
    }
    rg(e, (i, s) => {
      if (i) return r(i);
      if (s) return r(null);
      Hr.lstat(t, (o) => {
        if (o) return (o.message = o.message.replace('lstat', 'ensureLink')), r(o);
        let a = ng.dirname(e);
        rg(a, (c, l) => {
          if (c) return r(c);
          if (l) return n(t, e);
          ig.mkdirs(a, (u) => {
            if (u) return r(u);
            n(t, e);
          });
        });
      });
    });
  }
  function fT(t, e) {
    if (Hr.existsSync(e)) return;
    try {
      Hr.lstatSync(t);
    } catch (s) {
      throw ((s.message = s.message.replace('lstat', 'ensureLink')), s);
    }
    let n = ng.dirname(e);
    return Hr.existsSync(n) || ig.mkdirsSync(n), Hr.linkSync(t, e);
  }
  sg.exports = { createLink: uT(lT), createLinkSync: fT };
});
var cg = E((wL, ag) => {
  'use strict';
  var dr = require('path'),
    xi = ge(),
    hT = Tt().pathExists;
  function dT(t, e, r) {
    if (dr.isAbsolute(t))
      return xi.lstat(t, (n) =>
        n
          ? ((n.message = n.message.replace('lstat', 'ensureSymlink')), r(n))
          : r(null, { toCwd: t, toDst: t }),
      );
    {
      let n = dr.dirname(e),
        i = dr.join(n, t);
      return hT(i, (s, o) =>
        s
          ? r(s)
          : o
          ? r(null, { toCwd: i, toDst: t })
          : xi.lstat(t, (a) =>
              a
                ? ((a.message = a.message.replace('lstat', 'ensureSymlink')), r(a))
                : r(null, { toCwd: t, toDst: dr.relative(n, t) }),
            ),
      );
    }
  }
  function pT(t, e) {
    let r;
    if (dr.isAbsolute(t)) {
      if (((r = xi.existsSync(t)), !r))
        throw new Error('absolute srcpath does not exist');
      return { toCwd: t, toDst: t };
    } else {
      let n = dr.dirname(e),
        i = dr.join(n, t);
      if (((r = xi.existsSync(i)), r)) return { toCwd: i, toDst: t };
      if (((r = xi.existsSync(t)), !r))
        throw new Error('relative srcpath does not exist');
      return { toCwd: t, toDst: dr.relative(n, t) };
    }
  }
  ag.exports = { symlinkPaths: dT, symlinkPathsSync: pT };
});
var fg = E((RL, lg) => {
  'use strict';
  var ug = ge();
  function mT(t, e, r) {
    if (((r = typeof e == 'function' ? e : r), (e = typeof e == 'function' ? !1 : e), e))
      return r(null, e);
    ug.lstat(t, (n, i) => {
      if (n) return r(null, 'file');
      (e = i && i.isDirectory() ? 'dir' : 'file'), r(null, e);
    });
  }
  function yT(t, e) {
    let r;
    if (e) return e;
    try {
      r = ug.lstatSync(t);
    } catch {
      return 'file';
    }
    return r && r.isDirectory() ? 'dir' : 'file';
  }
  lg.exports = { symlinkType: mT, symlinkTypeSync: yT };
});
var gg = E((xL, Eg) => {
  'use strict';
  var ET = Ve().fromCallback,
    dg = require('path'),
    Pn = ge(),
    pg = Qe(),
    gT = pg.mkdirs,
    _T = pg.mkdirsSync,
    mg = cg(),
    bT = mg.symlinkPaths,
    vT = mg.symlinkPathsSync,
    yg = fg(),
    ST = yg.symlinkType,
    wT = yg.symlinkTypeSync,
    hg = Tt().pathExists;
  function RT(t, e, r, n) {
    (n = typeof r == 'function' ? r : n),
      (r = typeof r == 'function' ? !1 : r),
      hg(e, (i, s) => {
        if (i) return n(i);
        if (s) return n(null);
        bT(t, e, (o, a) => {
          if (o) return n(o);
          (t = a.toDst),
            ST(a.toCwd, r, (c, l) => {
              if (c) return n(c);
              let u = dg.dirname(e);
              hg(u, (f, h) => {
                if (f) return n(f);
                if (h) return Pn.symlink(t, e, l, n);
                gT(u, (d) => {
                  if (d) return n(d);
                  Pn.symlink(t, e, l, n);
                });
              });
            });
        });
      });
  }
  function xT(t, e, r) {
    if (Pn.existsSync(e)) return;
    let i = vT(t, e);
    (t = i.toDst), (r = wT(i.toCwd, r));
    let s = dg.dirname(e);
    return Pn.existsSync(s) || _T(s), Pn.symlinkSync(t, e, r);
  }
  Eg.exports = { createSymlink: ET(RT), createSymlinkSync: xT };
});
var bg = E((OL, _g) => {
  'use strict';
  var ko = tg(),
    Po = og(),
    Uo = gg();
  _g.exports = {
    createFile: ko.createFile,
    createFileSync: ko.createFileSync,
    ensureFile: ko.createFile,
    ensureFileSync: ko.createFileSync,
    createLink: Po.createLink,
    createLinkSync: Po.createLinkSync,
    ensureLink: Po.createLink,
    ensureLinkSync: Po.createLinkSync,
    createSymlink: Uo.createSymlink,
    createSymlinkSync: Uo.createSymlinkSync,
    ensureSymlink: Uo.createSymlink,
    ensureSymlinkSync: Uo.createSymlinkSync,
  };
});
var Rg = E((TL, wg) => {
  'use strict';
  var Un;
  try {
    Un = ge();
  } catch {
    Un = require('fs');
  }
  function OT(t, e, r) {
    r == null && ((r = e), (e = {})),
      typeof e == 'string' && (e = { encoding: e }),
      (e = e || {});
    var n = e.fs || Un,
      i = !0;
    'throws' in e && (i = e.throws),
      n.readFile(t, e, function (s, o) {
        if (s) return r(s);
        o = Sg(o);
        var a;
        try {
          a = JSON.parse(o, e ? e.reviver : null);
        } catch (c) {
          return i ? ((c.message = t + ': ' + c.message), r(c)) : r(null, null);
        }
        r(null, a);
      });
  }
  function TT(t, e) {
    (e = e || {}), typeof e == 'string' && (e = { encoding: e });
    var r = e.fs || Un,
      n = !0;
    'throws' in e && (n = e.throws);
    try {
      var i = r.readFileSync(t, e);
      return (i = Sg(i)), JSON.parse(i, e.reviver);
    } catch (s) {
      if (n) throw ((s.message = t + ': ' + s.message), s);
      return null;
    }
  }
  function vg(t, e) {
    var r,
      n = `
`;
    typeof e == 'object' &&
      e !== null &&
      (e.spaces && (r = e.spaces), e.EOL && (n = e.EOL));
    var i = JSON.stringify(t, e ? e.replacer : null, r);
    return i.replace(/\n/g, n) + n;
  }
  function CT(t, e, r, n) {
    n == null && ((n = r), (r = {})), (r = r || {});
    var i = r.fs || Un,
      s = '';
    try {
      s = vg(e, r);
    } catch (o) {
      n && n(o, null);
      return;
    }
    i.writeFile(t, s, r, n);
  }
  function IT(t, e, r) {
    r = r || {};
    var n = r.fs || Un,
      i = vg(e, r);
    return n.writeFileSync(t, i, r);
  }
  function Sg(t) {
    return (
      Buffer.isBuffer(t) && (t = t.toString('utf8')), (t = t.replace(/^\uFEFF/, '')), t
    );
  }
  var NT = { readFile: OT, readFileSync: TT, writeFile: CT, writeFileSync: IT };
  wg.exports = NT;
});
var Mo = E((CL, Og) => {
  'use strict';
  var xg = Ve().fromCallback,
    Fo = Rg();
  Og.exports = {
    readJson: xg(Fo.readFile),
    readJsonSync: Fo.readFileSync,
    writeJson: xg(Fo.writeFile),
    writeJsonSync: Fo.writeFileSync,
  };
});
var Ig = E((IL, Cg) => {
  'use strict';
  var AT = require('path'),
    DT = Qe(),
    LT = Tt().pathExists,
    Tg = Mo();
  function kT(t, e, r, n) {
    typeof r == 'function' && ((n = r), (r = {}));
    let i = AT.dirname(t);
    LT(i, (s, o) => {
      if (s) return n(s);
      if (o) return Tg.writeJson(t, e, r, n);
      DT.mkdirs(i, (a) => {
        if (a) return n(a);
        Tg.writeJson(t, e, r, n);
      });
    });
  }
  Cg.exports = kT;
});
var Ag = E((NL, Ng) => {
  'use strict';
  var PT = ge(),
    UT = require('path'),
    FT = Qe(),
    MT = Mo();
  function qT(t, e, r) {
    let n = UT.dirname(t);
    PT.existsSync(n) || FT.mkdirsSync(n), MT.writeJsonSync(t, e, r);
  }
  Ng.exports = qT;
});
var Lg = E((AL, Dg) => {
  'use strict';
  var BT = Ve().fromCallback,
    Be = Mo();
  Be.outputJson = BT(Ig());
  Be.outputJsonSync = Ag();
  Be.outputJSON = Be.outputJson;
  Be.outputJSONSync = Be.outputJsonSync;
  Be.writeJSON = Be.writeJson;
  Be.writeJSONSync = Be.writeJsonSync;
  Be.readJSON = Be.readJson;
  Be.readJSONSync = Be.readJsonSync;
  Dg.exports = Be;
});
var Fg = E((DL, Ug) => {
  'use strict';
  var We = ge(),
    zr = require('path'),
    jT = sl().copySync,
    ll = wi().removeSync,
    GT = Qe().mkdirsSync,
    $T = nl();
  function Pg(t, e, r) {
    r = r || {};
    let n = r.overwrite || r.clobber || !1;
    if (((t = zr.resolve(t)), (e = zr.resolve(e)), t === e)) return We.accessSync(t);
    if (VT(t, e)) throw new Error(`Cannot move '${t}' into itself '${e}'.`);
    GT(zr.dirname(e)), i();
    function i() {
      if (n)
        try {
          return We.renameSync(t, e);
        } catch (s) {
          if (s.code === 'ENOTEMPTY' || s.code === 'EEXIST' || s.code === 'EPERM')
            return ll(e), (r.overwrite = !1), Pg(t, e, r);
          if (s.code !== 'EXDEV') throw s;
          return kg(t, e, n);
        }
      else
        try {
          return We.linkSync(t, e), We.unlinkSync(t);
        } catch (s) {
          if (
            s.code === 'EXDEV' ||
            s.code === 'EISDIR' ||
            s.code === 'EPERM' ||
            s.code === 'ENOTSUP'
          )
            return kg(t, e, n);
          throw s;
        }
    }
  }
  function kg(t, e, r) {
    return We.statSync(t).isDirectory() ? zT(t, e, r) : HT(t, e, r);
  }
  function HT(t, e, r) {
    let i = $T(65536),
      s = r ? 'w' : 'wx',
      o = We.openSync(t, 'r'),
      a = We.fstatSync(o),
      c = We.openSync(e, s, a.mode),
      l = 0;
    for (; l < a.size; ) {
      let u = We.readSync(o, i, 0, 65536, l);
      We.writeSync(c, i, 0, u), (l += u);
    }
    return We.closeSync(o), We.closeSync(c), We.unlinkSync(t);
  }
  function zT(t, e, r) {
    let n = { overwrite: !1 };
    r && ll(e), i();
    function i() {
      return jT(t, e, n), ll(t);
    }
  }
  function VT(t, e) {
    try {
      return (
        We.statSync(t).isDirectory() &&
        t !== e &&
        e.indexOf(t) > -1 &&
        e.split(zr.dirname(t) + zr.sep)[1].split(zr.sep)[0] === zr.basename(t)
      );
    } catch {
      return !1;
    }
  }
  Ug.exports = { moveSync: Pg };
});
var jg = E((LL, Bg) => {
  'use strict';
  var WT = Ve().fromCallback,
    fl = ge(),
    Oi = require('path'),
    XT = cl().copy,
    qg = wi().remove,
    KT = Qe().mkdirp,
    YT = Tt().pathExists;
  function JT(t, e, r, n) {
    typeof r == 'function' && ((n = r), (r = {}));
    let i = r.overwrite || r.clobber || !1;
    if (((t = Oi.resolve(t)), (e = Oi.resolve(e)), t === e)) return fl.access(t, n);
    fl.stat(t, (s, o) => {
      if (s) return n(s);
      if (o.isDirectory() && eC(t, e))
        return n(new Error(`Cannot move '${t}' to a subdirectory of itself, '${e}'.`));
      KT(Oi.dirname(e), (a) => (a ? n(a) : ZT(t, e, i, n)));
    });
  }
  function ZT(t, e, r, n) {
    if (r) return qg(e, (i) => (i ? n(i) : Mg(t, e, r, n)));
    YT(e, (i, s) =>
      i ? n(i) : s ? n(new Error('dest already exists.')) : Mg(t, e, r, n),
    );
  }
  function Mg(t, e, r, n) {
    fl.rename(t, e, (i) => (i ? (i.code !== 'EXDEV' ? n(i) : QT(t, e, r, n)) : n()));
  }
  function QT(t, e, r, n) {
    XT(t, e, { overwrite: r, errorOnExist: !0 }, (s) => (s ? n(s) : qg(t, n)));
  }
  function eC(t, e) {
    let r = t.split(Oi.sep),
      n = e.split(Oi.sep);
    return r.reduce((i, s, o) => i && n[o] === s, !0);
  }
  Bg.exports = { move: WT(JT) };
});
var zg = E((kL, Hg) => {
  'use strict';
  var tC = Ve().fromCallback,
    Ti = ge(),
    Gg = require('path'),
    $g = Qe(),
    rC = Tt().pathExists;
  function nC(t, e, r, n) {
    typeof r == 'function' && ((n = r), (r = 'utf8'));
    let i = Gg.dirname(t);
    rC(i, (s, o) => {
      if (s) return n(s);
      if (o) return Ti.writeFile(t, e, r, n);
      $g.mkdirs(i, (a) => {
        if (a) return n(a);
        Ti.writeFile(t, e, r, n);
      });
    });
  }
  function iC(t, ...e) {
    let r = Gg.dirname(t);
    if (Ti.existsSync(r)) return Ti.writeFileSync(t, ...e);
    $g.mkdirsSync(r), Ti.writeFileSync(t, ...e);
  }
  Hg.exports = { outputFile: tC(nC), outputFileSync: iC };
});
var qo = E((PL, hl) => {
  'use strict';
  hl.exports = Object.assign(
    {},
    Wu(),
    sl(),
    cl(),
    JE(),
    bg(),
    Lg(),
    Qe(),
    Fg(),
    jg(),
    zg(),
    Tt(),
    wi(),
  );
  var Vg = require('fs');
  Object.getOwnPropertyDescriptor(Vg, 'promises') &&
    Object.defineProperty(hl.exports, 'promises', {
      get() {
        return Vg.promises;
      },
    });
});
var pl = E((dl) => {
  'use strict';
  Object.defineProperty(dl, '__esModule', { value: !0 });
  function sC(t) {
    return typeof t == 'function';
  }
  dl.isFunction = sC;
});
var Bo = E((yl) => {
  'use strict';
  Object.defineProperty(yl, '__esModule', { value: !0 });
  var ml = !1;
  yl.config = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(t) {
      if (t) {
        var e = new Error();
        console.warn(
          `DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: 
` + e.stack,
        );
      } else ml && console.log('RxJS: Back to a better error behavior. Thank you. <3');
      ml = t;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return ml;
    },
  };
});
var jo = E((El) => {
  'use strict';
  Object.defineProperty(El, '__esModule', { value: !0 });
  function oC(t) {
    setTimeout(function () {
      throw t;
    }, 0);
  }
  El.hostReportError = oC;
});
var _l = E((gl) => {
  'use strict';
  Object.defineProperty(gl, '__esModule', { value: !0 });
  var aC = Bo(),
    cC = jo();
  gl.empty = {
    closed: !0,
    next: function (t) {},
    error: function (t) {
      if (aC.config.useDeprecatedSynchronousErrorHandling) throw t;
      cC.hostReportError(t);
    },
    complete: function () {},
  };
});
var Wg = E((bl) => {
  'use strict';
  Object.defineProperty(bl, '__esModule', { value: !0 });
  bl.isArray = (function () {
    return (
      Array.isArray ||
      function (t) {
        return t && typeof t.length == 'number';
      }
    );
  })();
});
var Sl = E((vl) => {
  'use strict';
  Object.defineProperty(vl, '__esModule', { value: !0 });
  function uC(t) {
    return t !== null && typeof t == 'object';
  }
  vl.isObject = uC;
});
var Xg = E((wl) => {
  'use strict';
  Object.defineProperty(wl, '__esModule', { value: !0 });
  var lC = (function () {
    function t(e) {
      return (
        Error.call(this),
        (this.message = e
          ? e.length +
            ` errors occurred during unsubscription:
` +
            e.map(function (r, n) {
              return n + 1 + ') ' + r.toString();
            }).join(`
  `)
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = e),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })();
  wl.UnsubscriptionError = lC;
});
var pr = E((Rl) => {
  'use strict';
  Object.defineProperty(Rl, '__esModule', { value: !0 });
  var fC = Wg(),
    hC = Sl(),
    dC = pl(),
    Go = Xg(),
    pC = (function () {
      function t(e) {
        (this.closed = !1),
          (this._parentOrParents = null),
          (this._subscriptions = null),
          e && (this._unsubscribe = e);
      }
      return (
        (t.prototype.unsubscribe = function () {
          var e;
          if (!this.closed) {
            var r = this,
              n = r._parentOrParents,
              i = r._unsubscribe,
              s = r._subscriptions;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (n !== null)
              for (var o = 0; o < n.length; ++o) {
                var a = n[o];
                a.remove(this);
              }
            if (dC.isFunction(i))
              try {
                i.call(this);
              } catch (u) {
                e = u instanceof Go.UnsubscriptionError ? Kg(u.errors) : [u];
              }
            if (fC.isArray(s))
              for (var o = -1, c = s.length; ++o < c; ) {
                var l = s[o];
                if (hC.isObject(l))
                  try {
                    l.unsubscribe();
                  } catch (f) {
                    (e = e || []),
                      f instanceof Go.UnsubscriptionError
                        ? (e = e.concat(Kg(f.errors)))
                        : e.push(f);
                  }
              }
            if (e) throw new Go.UnsubscriptionError(e);
          }
        }),
        (t.prototype.add = function (e) {
          var r = e;
          if (!e) return t.EMPTY;
          switch (typeof e) {
            case 'function':
              r = new t(e);
            case 'object':
              if (r === this || r.closed || typeof r.unsubscribe != 'function') return r;
              if (this.closed) return r.unsubscribe(), r;
              if (!(r instanceof t)) {
                var n = r;
                (r = new t()), (r._subscriptions = [n]);
              }
              break;
            default:
              throw new Error('unrecognized teardown ' + e + ' added to Subscription.');
          }
          var i = r._parentOrParents;
          if (i === null) r._parentOrParents = this;
          else if (i instanceof t) {
            if (i === this) return r;
            r._parentOrParents = [i, this];
          } else if (i.indexOf(this) === -1) i.push(this);
          else return r;
          var s = this._subscriptions;
          return s === null ? (this._subscriptions = [r]) : s.push(r), r;
        }),
        (t.prototype.remove = function (e) {
          var r = this._subscriptions;
          if (r) {
            var n = r.indexOf(e);
            n !== -1 && r.splice(n, 1);
          }
        }),
        (t.EMPTY = (function (e) {
          return (e.closed = !0), e;
        })(new t())),
        t
      );
    })();
  Rl.Subscription = pC;
  function Kg(t) {
    return t.reduce(function (e, r) {
      return e.concat(r instanceof Go.UnsubscriptionError ? r.errors : r);
    }, []);
  }
});
var $o = E((Ci) => {
  'use strict';
  Object.defineProperty(Ci, '__esModule', { value: !0 });
  Ci.rxSubscriber = (function () {
    return typeof Symbol == 'function'
      ? Symbol('rxSubscriber')
      : '@@rxSubscriber_' + Math.random();
  })();
  Ci.$$rxSubscriber = Ci.rxSubscriber;
});
var Vr = E((Mn) => {
  'use strict';
  var Jg =
    (Mn && Mn.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(Mn, '__esModule', { value: !0 });
  var Yg = pl(),
    xl = _l(),
    mC = pr(),
    yC = $o(),
    Fn = Bo(),
    Ho = jo(),
    Zg = (function (t) {
      Jg(e, t);
      function e(r, n, i) {
        var s = t.call(this) || this;
        switch (
          ((s.syncErrorValue = null),
          (s.syncErrorThrown = !1),
          (s.syncErrorThrowable = !1),
          (s.isStopped = !1),
          arguments.length)
        ) {
          case 0:
            s.destination = xl.empty;
            break;
          case 1:
            if (!r) {
              s.destination = xl.empty;
              break;
            }
            if (typeof r == 'object') {
              r instanceof e
                ? ((s.syncErrorThrowable = r.syncErrorThrowable),
                  (s.destination = r),
                  r.add(s))
                : ((s.syncErrorThrowable = !0), (s.destination = new Ol(s, r)));
              break;
            }
          default:
            (s.syncErrorThrowable = !0), (s.destination = new Ol(s, r, n, i));
            break;
        }
        return s;
      }
      return (
        (e.prototype[yC.rxSubscriber] = function () {
          return this;
        }),
        (e.create = function (r, n, i) {
          var s = new e(r, n, i);
          return (s.syncErrorThrowable = !1), s;
        }),
        (e.prototype.next = function (r) {
          this.isStopped || this._next(r);
        }),
        (e.prototype.error = function (r) {
          this.isStopped || ((this.isStopped = !0), this._error(r));
        }),
        (e.prototype.complete = function () {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }),
        (e.prototype.unsubscribe = function () {
          this.closed || ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
        }),
        (e.prototype._next = function (r) {
          this.destination.next(r);
        }),
        (e.prototype._error = function (r) {
          this.destination.error(r), this.unsubscribe();
        }),
        (e.prototype._complete = function () {
          this.destination.complete(), this.unsubscribe();
        }),
        (e.prototype._unsubscribeAndRecycle = function () {
          var r = this._parentOrParents;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = r),
            this
          );
        }),
        e
      );
    })(mC.Subscription);
  Mn.Subscriber = Zg;
  var Ol = (function (t) {
    Jg(e, t);
    function e(r, n, i, s) {
      var o = t.call(this) || this;
      o._parentSubscriber = r;
      var a,
        c = o;
      return (
        Yg.isFunction(n)
          ? (a = n)
          : n &&
            ((a = n.next),
            (i = n.error),
            (s = n.complete),
            n !== xl.empty &&
              ((c = Object.create(n)),
              Yg.isFunction(c.unsubscribe) && o.add(c.unsubscribe.bind(c)),
              (c.unsubscribe = o.unsubscribe.bind(o)))),
        (o._context = c),
        (o._next = a),
        (o._error = i),
        (o._complete = s),
        o
      );
    }
    return (
      (e.prototype.next = function (r) {
        if (!this.isStopped && this._next) {
          var n = this._parentSubscriber;
          !Fn.config.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
            ? this.__tryOrUnsub(this._next, r)
            : this.__tryOrSetError(n, this._next, r) && this.unsubscribe();
        }
      }),
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this._parentSubscriber,
            i = Fn.config.useDeprecatedSynchronousErrorHandling;
          if (this._error)
            !i || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(this._error, r), this.unsubscribe())
              : (this.__tryOrSetError(n, this._error, r), this.unsubscribe());
          else if (n.syncErrorThrowable)
            i
              ? ((n.syncErrorValue = r), (n.syncErrorThrown = !0))
              : Ho.hostReportError(r),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), i)) throw r;
            Ho.hostReportError(r);
          }
        }
      }),
      (e.prototype.complete = function () {
        var r = this;
        if (!this.isStopped) {
          var n = this._parentSubscriber;
          if (this._complete) {
            var i = function () {
              return r._complete.call(r._context);
            };
            !Fn.config.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(i), this.unsubscribe())
              : (this.__tryOrSetError(n, i), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (e.prototype.__tryOrUnsub = function (r, n) {
        try {
          r.call(this._context, n);
        } catch (i) {
          if ((this.unsubscribe(), Fn.config.useDeprecatedSynchronousErrorHandling))
            throw i;
          Ho.hostReportError(i);
        }
      }),
      (e.prototype.__tryOrSetError = function (r, n, i) {
        if (!Fn.config.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
        try {
          n.call(this._context, i);
        } catch (s) {
          return Fn.config.useDeprecatedSynchronousErrorHandling
            ? ((r.syncErrorValue = s), (r.syncErrorThrown = !0), !0)
            : (Ho.hostReportError(s), !0);
        }
        return !1;
      }),
      (e.prototype._unsubscribe = function () {
        var r = this._parentSubscriber;
        (this._context = null), (this._parentSubscriber = null), r.unsubscribe();
      }),
      e
    );
  })(Zg);
  Mn.SafeSubscriber = Ol;
});
var Qg = E((Tl) => {
  'use strict';
  Object.defineProperty(Tl, '__esModule', { value: !0 });
  var EC = Vr();
  function gC(t) {
    for (; t; ) {
      var e = t,
        r = e.closed,
        n = e.destination,
        i = e.isStopped;
      if (r || i) return !1;
      n && n instanceof EC.Subscriber ? (t = n) : (t = null);
    }
    return !0;
  }
  Tl.canReportError = gC;
});
var t_ = E((Il) => {
  'use strict';
  Object.defineProperty(Il, '__esModule', { value: !0 });
  var Cl = Vr(),
    e_ = $o(),
    _C = _l();
  function bC(t, e, r) {
    if (t) {
      if (t instanceof Cl.Subscriber) return t;
      if (t[e_.rxSubscriber]) return t[e_.rxSubscriber]();
    }
    return !t && !e && !r ? new Cl.Subscriber(_C.empty) : new Cl.Subscriber(t, e, r);
  }
  Il.toSubscriber = bC;
});
var qn = E((Nl) => {
  'use strict';
  Object.defineProperty(Nl, '__esModule', { value: !0 });
  Nl.observable = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
  })();
});
var r_ = E((Al) => {
  'use strict';
  Object.defineProperty(Al, '__esModule', { value: !0 });
  function vC(t) {
    return t;
  }
  Al.identity = vC;
});
var i_ = E((zo) => {
  'use strict';
  Object.defineProperty(zo, '__esModule', { value: !0 });
  var SC = r_();
  function wC() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return n_(t);
  }
  zo.pipe = wC;
  function n_(t) {
    return t.length === 0
      ? SC.identity
      : t.length === 1
      ? t[0]
      : function (r) {
          return t.reduce(function (n, i) {
            return i(n);
          }, r);
        };
  }
  zo.pipeFromArray = n_;
});
var mr = E((Dl) => {
  'use strict';
  Object.defineProperty(Dl, '__esModule', { value: !0 });
  var RC = Qg(),
    xC = t_(),
    OC = qn(),
    TC = i_(),
    Vo = Bo(),
    CC = (function () {
      function t(e) {
        (this._isScalar = !1), e && (this._subscribe = e);
      }
      return (
        (t.prototype.lift = function (e) {
          var r = new t();
          return (r.source = this), (r.operator = e), r;
        }),
        (t.prototype.subscribe = function (e, r, n) {
          var i = this.operator,
            s = xC.toSubscriber(e, r, n);
          if (
            (i
              ? s.add(i.call(s, this.source))
              : s.add(
                  this.source ||
                    (Vo.config.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                    ? this._subscribe(s)
                    : this._trySubscribe(s),
                ),
            Vo.config.useDeprecatedSynchronousErrorHandling &&
              s.syncErrorThrowable &&
              ((s.syncErrorThrowable = !1), s.syncErrorThrown))
          )
            throw s.syncErrorValue;
          return s;
        }),
        (t.prototype._trySubscribe = function (e) {
          try {
            return this._subscribe(e);
          } catch (r) {
            Vo.config.useDeprecatedSynchronousErrorHandling &&
              ((e.syncErrorThrown = !0), (e.syncErrorValue = r)),
              RC.canReportError(e) ? e.error(r) : console.warn(r);
          }
        }),
        (t.prototype.forEach = function (e, r) {
          var n = this;
          return (
            (r = s_(r)),
            new r(function (i, s) {
              var o;
              o = n.subscribe(
                function (a) {
                  try {
                    e(a);
                  } catch (c) {
                    s(c), o && o.unsubscribe();
                  }
                },
                s,
                i,
              );
            })
          );
        }),
        (t.prototype._subscribe = function (e) {
          var r = this.source;
          return r && r.subscribe(e);
        }),
        (t.prototype[OC.observable] = function () {
          return this;
        }),
        (t.prototype.pipe = function () {
          for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
          return e.length === 0 ? this : TC.pipeFromArray(e)(this);
        }),
        (t.prototype.toPromise = function (e) {
          var r = this;
          return (
            (e = s_(e)),
            new e(function (n, i) {
              var s;
              r.subscribe(
                function (o) {
                  return (s = o);
                },
                function (o) {
                  return i(o);
                },
                function () {
                  return n(s);
                },
              );
            })
          );
        }),
        (t.create = function (e) {
          return new t(e);
        }),
        t
      );
    })();
  Dl.Observable = CC;
  function s_(t) {
    if ((t || (t = Vo.config.Promise || Promise), !t))
      throw new Error('no Promise impl found');
    return t;
  }
});
var o_ = E((Ll) => {
  'use strict';
  Object.defineProperty(Ll, '__esModule', { value: !0 });
  var IC = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = 'object unsubscribed'),
        (this.name = 'ObjectUnsubscribedError'),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })();
  Ll.ObjectUnsubscribedError = IC;
});
var a_ = E((Ii) => {
  'use strict';
  var NC =
    (Ii && Ii.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(Ii, '__esModule', { value: !0 });
  var AC = pr(),
    DC = (function (t) {
      NC(e, t);
      function e(r, n) {
        var i = t.call(this) || this;
        return (i.subject = r), (i.subscriber = n), (i.closed = !1), i;
      }
      return (
        (e.prototype.unsubscribe = function () {
          if (!this.closed) {
            this.closed = !0;
            var r = this.subject,
              n = r.observers;
            if (
              ((this.subject = null), !(!n || n.length === 0 || r.isStopped || r.closed))
            ) {
              var i = n.indexOf(this.subscriber);
              i !== -1 && n.splice(i, 1);
            }
          }
        }),
        e
      );
    })(AC.Subscription);
  Ii.SubjectSubscription = DC;
});
var f_ = E((Wr) => {
  'use strict';
  var Ul =
    (Wr && Wr.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(Wr, '__esModule', { value: !0 });
  var c_ = mr(),
    LC = Vr(),
    kl = pr(),
    Ni = o_(),
    kC = a_(),
    PC = $o(),
    u_ = (function (t) {
      Ul(e, t);
      function e(r) {
        var n = t.call(this, r) || this;
        return (n.destination = r), n;
      }
      return e;
    })(LC.Subscriber);
  Wr.SubjectSubscriber = u_;
  var l_ = (function (t) {
    Ul(e, t);
    function e() {
      var r = t.call(this) || this;
      return (
        (r.observers = []),
        (r.closed = !1),
        (r.isStopped = !1),
        (r.hasError = !1),
        (r.thrownError = null),
        r
      );
    }
    return (
      (e.prototype[PC.rxSubscriber] = function () {
        return new u_(this);
      }),
      (e.prototype.lift = function (r) {
        var n = new Pl(this, this);
        return (n.operator = r), n;
      }),
      (e.prototype.next = function (r) {
        if (this.closed) throw new Ni.ObjectUnsubscribedError();
        if (!this.isStopped)
          for (var n = this.observers, i = n.length, s = n.slice(), o = 0; o < i; o++)
            s[o].next(r);
      }),
      (e.prototype.error = function (r) {
        if (this.closed) throw new Ni.ObjectUnsubscribedError();
        (this.hasError = !0), (this.thrownError = r), (this.isStopped = !0);
        for (var n = this.observers, i = n.length, s = n.slice(), o = 0; o < i; o++)
          s[o].error(r);
        this.observers.length = 0;
      }),
      (e.prototype.complete = function () {
        if (this.closed) throw new Ni.ObjectUnsubscribedError();
        this.isStopped = !0;
        for (var r = this.observers, n = r.length, i = r.slice(), s = 0; s < n; s++)
          i[s].complete();
        this.observers.length = 0;
      }),
      (e.prototype.unsubscribe = function () {
        (this.isStopped = !0), (this.closed = !0), (this.observers = null);
      }),
      (e.prototype._trySubscribe = function (r) {
        if (this.closed) throw new Ni.ObjectUnsubscribedError();
        return t.prototype._trySubscribe.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        if (this.closed) throw new Ni.ObjectUnsubscribedError();
        return this.hasError
          ? (r.error(this.thrownError), kl.Subscription.EMPTY)
          : this.isStopped
          ? (r.complete(), kl.Subscription.EMPTY)
          : (this.observers.push(r), new kC.SubjectSubscription(this, r));
      }),
      (e.prototype.asObservable = function () {
        var r = new c_.Observable();
        return (r.source = this), r;
      }),
      (e.create = function (r, n) {
        return new Pl(r, n);
      }),
      e
    );
  })(c_.Observable);
  Wr.Subject = l_;
  var Pl = (function (t) {
    Ul(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.destination = r), (i.source = n), i;
    }
    return (
      (e.prototype.next = function (r) {
        var n = this.destination;
        n && n.next && n.next(r);
      }),
      (e.prototype.error = function (r) {
        var n = this.destination;
        n && n.error && this.destination.error(r);
      }),
      (e.prototype.complete = function () {
        var r = this.destination;
        r && r.complete && this.destination.complete();
      }),
      (e.prototype._subscribe = function (r) {
        var n = this.source;
        return n ? this.source.subscribe(r) : kl.Subscription.EMPTY;
      }),
      e
    );
  })(l_);
  Wr.AnonymousSubject = Pl;
});
function MC(t, e, r) {
  let n = Jr();
  return new Dn(t, r, e, n);
}
function qC(t, e, r) {
  let n = JSON.stringify(t.map((i) => ({ taskId: i.taskId, hash: i.hash })));
  F && Wo.note({ title: `Executed tasks with hashes: ${n}` }),
    (0, h_.writeFileSync)(d_.join(e, `tasks-hashes-${r}`), n);
}
function BC(t, e, r) {
  t.filter((i) => i.cacheStatus === 'local-cache-hit')
    .map((i) => i.hash)
    .forEach((i) => e.store(i, r));
}
async function Fl({
  daemon: t,
  options: e,
  fileStorage: r,
  remoteCache: n,
  api: i,
  outputObfuscator: s,
  runStartTime: o,
  messages: a,
  endOfRunMessage: c,
  taskExecutions: l,
  versionOfNxBefore133: u,
  inner: f,
  encryptionKey: h,
  storeInCurrentProcess: d,
  distributedExecutionId: p,
  runContext: v,
}) {
  let m = new Date().toISOString(),
    w = me(),
    L = {
      command: s.obfuscate(Wi()),
      startTime: o,
      endTime: m,
      distributedExecutionId: p,
      branch: w,
      runGroup: ve(),
      sha: w ? et() : void 0,
      inner: f,
    },
    O = { branch: w, runGroup: ve(), ciExecutionId: je(), ciExecutionEnv: xe() };
  if (d) {
    ut(p) && (qC(l, Xo, p), BC(l, n, Xo));
    try {
      await n.waitForStoreRequestsToComplete();
    } catch {
      return (
        Wo.error({ title: "Nx Cloud wasn't able to store artifacts." }),
        a.printMessages(),
        !1
      );
    }
    for (let N of r.storedHashes) {
      let P = l.find((I) => I.hash === N);
      if (!P) throw new Error(`Task with hash ${N} isn't recorded`);
      P.uploadedToStorage = !0;
    }
    try {
      await i.endRun(L, l, O);
    } catch {
      return (
        Wo.error({ title: "Nx Cloud wasn't able to record its run." }),
        a.printMessages(),
        !1
      );
    }
    await nn(e);
  } else
    try {
      let N = At ? At : e.accessToken,
        P = Ro(),
        I = require.resolve('./lib/daemon/process-run-end');
      await t.processInBackground(I, {
        encryptionKey: h,
        runnerOptions: { ...e, accessToken: N },
        delayedStoreRequests: n.delayedStoreRequests,
        ciExecutionContext: O,
        runEnd: { runData: L, taskExecutions: l, linkId: P },
        lightRunnerResolutionPaths: vr,
      }),
        (v.runUrl = `${hs(e.url || 'https://nx.app')}/runs/${P}`);
    } catch (N) {
      return (
        Wo.warn({ title: 'Nx Cloud Problems', bodyLines: [N.message || N.toString()] }),
        !1
      );
    }
  return (
    u
      ? setTimeout(() => {
          a.printMessages(), !a.anyErrors && !f && c.printCacheHitsMessage();
        }, 0)
      : (a.printMessages(), !a.anyErrors && !f && c.printCacheHitsMessage()),
    !0
  );
}
function jC(t, e, r, n) {
  let i = new bo(t, Xo, !0, e.cacheableOperations || [], r, n);
  try {
    let { CompositeLifeCycle: s } = dt();
    return s ? new s([e.lifeCycle, i]) : i;
  } catch {
    return i;
  }
}
async function GC(t, e, r, n, i) {
  if (n.skipNxCache) return;
  let s = r.map((c) => c.hash).filter((c) => !!c),
    o = await Promise.all(
      s.map((c) => {
        let l = (0, p_.join)(Xo, `${c}.commit`);
        return FC(l);
      }),
    ),
    a = [];
  for (let c = 0; c < o.length; ++c) o[c] || a.push(s[c]);
  if (a.length > 0) {
    let c = t.startRun(i, a);
    for (let l of a) e.requests[l] = c;
  }
}
function Ai(t, e, r, n = !1) {
  var P;
  let i = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID,
    s = { statuses: {}, scheduledTasks: [], requests: {}, allTasks: t },
    o = e.lifeCycle === void 0,
    a = [],
    c = new Nn(e),
    l = MC(c, e, s),
    u = new Eo(s, a, i),
    f = new lr(e.maskedProperties),
    h = new Date().toISOString(),
    d = jC(s, e, f, a),
    p = Rr || e.encryptionKey,
    v = new Yt(p),
    m = new Kt(e),
    w = ut(i) || !((P = r.daemon) != null && P.enabled()),
    L = new ur(v, m, e, 'cloud-enabled-runner'),
    O = new vo(c, l, s, L, i, w);
  GC(l, s, t, e, i), delete process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID;
  let N = UC(t, { ...e, remoteCache: O, lifeCycle: d }, r);
  if (N.subscribe) {
    let { Subject: I } = f_(),
      z = new I();
    return (
      N.subscribe({
        next: (G) => z.next(G),
        error: (G) => z.error(G),
        complete: async () => {
          !(await Fl({
            daemon: r.daemon,
            options: e,
            fileStorage: L,
            remoteCache: O,
            api: l,
            outputObfuscator: f,
            runStartTime: h,
            messages: c,
            endOfRunMessage: u,
            taskExecutions: a,
            versionOfNxBefore133: o,
            inner: n,
            encryptionKey: p,
            storeInCurrentProcess: w,
            runContext: s,
            distributedExecutionId: i,
          })) &&
            ut(i) &&
            process.exit(Vt),
            z.complete();
        },
      }),
      z
    );
  } else
    return N.then(
      async (I) => (
        !(await Fl({
          daemon: r.daemon,
          options: e,
          fileStorage: L,
          remoteCache: O,
          api: l,
          outputObfuscator: f,
          runStartTime: h,
          messages: c,
          endOfRunMessage: u,
          taskExecutions: a,
          versionOfNxBefore133: o,
          inner: n,
          encryptionKey: p,
          storeInCurrentProcess: w,
          runContext: s,
          distributedExecutionId: i,
        })) &&
          ut(i) &&
          process.exit(Vt),
        I
      ),
    ).catch(async (I) => {
      throw (
        (!(await Fl({
          daemon: r.daemon,
          options: e,
          fileStorage: L,
          remoteCache: O,
          api: l,
          outputObfuscator: f,
          runStartTime: h,
          messages: c,
          endOfRunMessage: u,
          taskExecutions: a,
          versionOfNxBefore133: o,
          inner: n,
          encryptionKey: p,
          storeInCurrentProcess: w,
          runContext: s,
          distributedExecutionId: i,
        })) &&
          ut(i) &&
          process.exit(Vt),
        I)
      );
    });
}
var h_,
  d_,
  p_,
  Wo,
  UC,
  Xo,
  FC,
  m_ = q(() => {
    'use strict';
    (h_ = require('fs')), (d_ = br(require('path'))), (p_ = require('path'));
    ie();
    Sr();
    Dt();
    Ya();
    ds();
    ps();
    yo();
    Py();
    Nu();
    go();
    qy();
    By();
    qu();
    Bu();
    ({ output: Wo } = Y()),
      ({ tasksRunner: UC, cacheDirectory: Xo } = dt()),
      ({ pathExists: FC } = qo());
  });
function $C(t) {
  return (0, g_.join)((0, E_.tmpdir)(), `run-group-${t}-marker.lock`);
}
function __(t) {
  (0, y_.mkdirSync)($C(t));
}
var y_,
  E_,
  g_,
  b_ = q(() => {
    'use strict';
    (y_ = require('fs')), (E_ = require('os')), (g_ = require('path'));
  });
async function Yo() {
  if (me() == null) return;
  let t = ve();
  F &&
    Ko.note({
      title: `Trying to create heartbeat background process for run group: ${t}`,
    });
  try {
    __(t);
  } catch {
    F && Ko.note({ title: 'Heartbeat marker exists, process must be running' });
    return;
  }
  await HC().catch(() => {
    Ko.error({
      title: 'Took longer than 3 seconds to hear from heartbeat process',
      bodyLines: [
        'The heartbeat process may have not started properly. This CIPE could have inconsistent status reporting.',
      ],
    });
  });
}
async function HC() {
  let t = process.env.NX_CLOUD_HEARTBEAT_INHERIT_STDIO == 'true' ? 'inherit' : 'pipe';
  return new Promise((e, r) => {
    let n = (0, v_.spawn)(
      process.execPath,
      [require.resolve('./lib/heartbeat/heartbeat-process.js')],
      {
        detached: !0,
        windowsHide: !0,
        stdio: t,
        env: {
          ...process.env,
          NX_CLOUD_LIGHT_CLIENT_RESOLUTION_PATHS: JSON.stringify(vr),
        },
      },
    );
    t === 'pipe'
      ? (n.stdout.on('data', (i) => {
          i == 'heartbeat-ready' &&
            (F && Ko.note({ title: 'Heartbeat process started successfully' }),
            n.unref(),
            e());
        }),
        setTimeout(() => r(), 3e3))
      : e();
  });
}
var v_,
  Ko,
  Ml = q(() => {
    'use strict';
    v_ = require('child_process');
    ie();
    Sr();
    b_();
    ({ output: Ko } = Y());
  });
function x_() {
  zC(w_), VC(R_, 'true');
}
function O_(t) {
  if (t === !0) return !0;
  if (t === !1) return !1;
  let e = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION;
  if (e === 'false' || e === 'FALSE' || e === '0') return !1;
  if (e === 'true' || e === 'TRUE' || e === '1') return !0;
  try {
    return (0, S_.readFileSync)(R_), !0;
  } catch {
    return !1;
  }
}
var S_,
  ql,
  zC,
  VC,
  WC,
  w_,
  R_,
  Bl = q(() => {
    'use strict';
    (S_ = require('fs')),
      (ql = require('path')),
      ({ ensureDirSync: zC, writeFileSync: VC } = qo()),
      (WC = process.env.NX_CACHE_DIRECTORY
        ? [process.env.NX_CACHE_DIRECTORY]
        : ['node_modules', '.cache', 'nx']),
      (w_ = (0, ql.join)(process.cwd(), ...WC)),
      (R_ = (0, ql.join)(w_, 'NX_CLOUD_DISTRIBUTED_EXECUTION'));
  });
async function Di(t) {
  let e = Te(t);
  return await ce(() => e.get('/nx-cloud/executions/workspace-status'));
}
var jl = q(() => {
  'use strict';
  gt();
});
var T_ = E((Gl) => {
  'use strict';
  Object.defineProperty(Gl, '__esModule', { value: !0 });
  Gl.subscribeToArray = function (t) {
    return function (e) {
      for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
      e.complete();
    };
  };
});
var C_ = E(($l) => {
  'use strict';
  Object.defineProperty($l, '__esModule', { value: !0 });
  var XC = jo();
  $l.subscribeToPromise = function (t) {
    return function (e) {
      return (
        t
          .then(
            function (r) {
              e.closed || (e.next(r), e.complete());
            },
            function (r) {
              return e.error(r);
            },
          )
          .then(null, XC.hostReportError),
        e
      );
    };
  };
});
var Li = E((Bn) => {
  'use strict';
  Object.defineProperty(Bn, '__esModule', { value: !0 });
  function I_() {
    return typeof Symbol != 'function' || !Symbol.iterator
      ? '@@iterator'
      : Symbol.iterator;
  }
  Bn.getSymbolIterator = I_;
  Bn.iterator = I_();
  Bn.$$iterator = Bn.iterator;
});
var N_ = E((Hl) => {
  'use strict';
  Object.defineProperty(Hl, '__esModule', { value: !0 });
  var KC = Li();
  Hl.subscribeToIterable = function (t) {
    return function (e) {
      var r = t[KC.iterator]();
      do {
        var n = r.next();
        if (n.done) {
          e.complete();
          break;
        }
        if ((e.next(n.value), e.closed)) break;
      } while (!0);
      return (
        typeof r.return == 'function' &&
          e.add(function () {
            r.return && r.return();
          }),
        e
      );
    };
  };
});
var A_ = E((zl) => {
  'use strict';
  Object.defineProperty(zl, '__esModule', { value: !0 });
  var YC = qn();
  zl.subscribeToObservable = function (t) {
    return function (e) {
      var r = t[YC.observable]();
      if (typeof r.subscribe != 'function')
        throw new TypeError(
          'Provided object does not correctly implement Symbol.observable',
        );
      return r.subscribe(e);
    };
  };
});
var Wl = E((Vl) => {
  'use strict';
  Object.defineProperty(Vl, '__esModule', { value: !0 });
  Vl.isArrayLike = function (t) {
    return t && typeof t.length == 'number' && typeof t != 'function';
  };
});
var Kl = E((Xl) => {
  'use strict';
  Object.defineProperty(Xl, '__esModule', { value: !0 });
  function JC(t) {
    return !!t && typeof t.subscribe != 'function' && typeof t.then == 'function';
  }
  Xl.isPromise = JC;
});
var Jl = E((Yl) => {
  'use strict';
  Object.defineProperty(Yl, '__esModule', { value: !0 });
  var ZC = T_(),
    QC = C_(),
    eI = N_(),
    tI = A_(),
    rI = Wl(),
    nI = Kl(),
    iI = Sl(),
    sI = Li(),
    oI = qn();
  Yl.subscribeTo = function (t) {
    if (t && typeof t[oI.observable] == 'function') return tI.subscribeToObservable(t);
    if (rI.isArrayLike(t)) return ZC.subscribeToArray(t);
    if (nI.isPromise(t)) return QC.subscribeToPromise(t);
    if (t && typeof t[sI.iterator] == 'function') return eI.subscribeToIterable(t);
    var e = iI.isObject(t) ? 'an invalid object' : "'" + t + "'",
      r =
        'You provided ' +
        e +
        ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.';
    throw new TypeError(r);
  };
});
var D_ = E((Zl) => {
  'use strict';
  Object.defineProperty(Zl, '__esModule', { value: !0 });
  var aI = mr(),
    cI = pr(),
    uI = qn();
  function lI(t, e) {
    return new aI.Observable(function (r) {
      var n = new cI.Subscription();
      return (
        n.add(
          e.schedule(function () {
            var i = t[uI.observable]();
            n.add(
              i.subscribe({
                next: function (s) {
                  n.add(
                    e.schedule(function () {
                      return r.next(s);
                    }),
                  );
                },
                error: function (s) {
                  n.add(
                    e.schedule(function () {
                      return r.error(s);
                    }),
                  );
                },
                complete: function () {
                  n.add(
                    e.schedule(function () {
                      return r.complete();
                    }),
                  );
                },
              }),
            );
          }),
        ),
        n
      );
    });
  }
  Zl.scheduleObservable = lI;
});
var L_ = E((Ql) => {
  'use strict';
  Object.defineProperty(Ql, '__esModule', { value: !0 });
  var fI = mr(),
    hI = pr();
  function dI(t, e) {
    return new fI.Observable(function (r) {
      var n = new hI.Subscription();
      return (
        n.add(
          e.schedule(function () {
            return t.then(
              function (i) {
                n.add(
                  e.schedule(function () {
                    r.next(i),
                      n.add(
                        e.schedule(function () {
                          return r.complete();
                        }),
                      );
                  }),
                );
              },
              function (i) {
                n.add(
                  e.schedule(function () {
                    return r.error(i);
                  }),
                );
              },
            );
          }),
        ),
        n
      );
    });
  }
  Ql.schedulePromise = dI;
});
var k_ = E((ef) => {
  'use strict';
  Object.defineProperty(ef, '__esModule', { value: !0 });
  var pI = mr(),
    mI = pr();
  function yI(t, e) {
    return new pI.Observable(function (r) {
      var n = new mI.Subscription(),
        i = 0;
      return (
        n.add(
          e.schedule(function () {
            if (i === t.length) {
              r.complete();
              return;
            }
            r.next(t[i++]), r.closed || n.add(this.schedule());
          }),
        ),
        n
      );
    });
  }
  ef.scheduleArray = yI;
});
var P_ = E((tf) => {
  'use strict';
  Object.defineProperty(tf, '__esModule', { value: !0 });
  var EI = mr(),
    gI = pr(),
    _I = Li();
  function bI(t, e) {
    if (!t) throw new Error('Iterable cannot be null');
    return new EI.Observable(function (r) {
      var n = new gI.Subscription(),
        i;
      return (
        n.add(function () {
          i && typeof i.return == 'function' && i.return();
        }),
        n.add(
          e.schedule(function () {
            (i = t[_I.iterator]()),
              n.add(
                e.schedule(function () {
                  if (!r.closed) {
                    var s, o;
                    try {
                      var a = i.next();
                      (s = a.value), (o = a.done);
                    } catch (c) {
                      r.error(c);
                      return;
                    }
                    o ? r.complete() : (r.next(s), this.schedule());
                  }
                }),
              );
          }),
        ),
        n
      );
    });
  }
  tf.scheduleIterable = bI;
});
var U_ = E((rf) => {
  'use strict';
  Object.defineProperty(rf, '__esModule', { value: !0 });
  var vI = qn();
  function SI(t) {
    return t && typeof t[vI.observable] == 'function';
  }
  rf.isInteropObservable = SI;
});
var F_ = E((nf) => {
  'use strict';
  Object.defineProperty(nf, '__esModule', { value: !0 });
  var wI = Li();
  function RI(t) {
    return t && typeof t[wI.iterator] == 'function';
  }
  nf.isIterable = RI;
});
var M_ = E((sf) => {
  'use strict';
  Object.defineProperty(sf, '__esModule', { value: !0 });
  var xI = D_(),
    OI = L_(),
    TI = k_(),
    CI = P_(),
    II = U_(),
    NI = Kl(),
    AI = Wl(),
    DI = F_();
  function LI(t, e) {
    if (t != null) {
      if (II.isInteropObservable(t)) return xI.scheduleObservable(t, e);
      if (NI.isPromise(t)) return OI.schedulePromise(t, e);
      if (AI.isArrayLike(t)) return TI.scheduleArray(t, e);
      if (DI.isIterable(t) || typeof t == 'string') return CI.scheduleIterable(t, e);
    }
    throw new TypeError(((t !== null && typeof t) || t) + ' is not observable');
  }
  sf.scheduled = LI;
});
var af = E((of) => {
  'use strict';
  Object.defineProperty(of, '__esModule', { value: !0 });
  var q_ = mr(),
    kI = Jl(),
    PI = M_();
  function UI(t, e) {
    return e
      ? PI.scheduled(t, e)
      : t instanceof q_.Observable
      ? t
      : new q_.Observable(kI.subscribeTo(t));
  }
  of.from = UI;
});
var B_ = E((ki) => {
  'use strict';
  var FI =
    (ki && ki.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(ki, '__esModule', { value: !0 });
  var MI = Vr(),
    qI = (function (t) {
      FI(e, t);
      function e() {
        return (t !== null && t.apply(this, arguments)) || this;
      }
      return (
        (e.prototype.notifyNext = function (r, n, i, s, o) {
          this.destination.next(n);
        }),
        (e.prototype.notifyError = function (r, n) {
          this.destination.error(r);
        }),
        (e.prototype.notifyComplete = function (r) {
          this.destination.complete();
        }),
        e
      );
    })(MI.Subscriber);
  ki.OuterSubscriber = qI;
});
var cf = E((Pi) => {
  'use strict';
  var BI =
    (Pi && Pi.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(Pi, '__esModule', { value: !0 });
  var jI = Vr(),
    GI = (function (t) {
      BI(e, t);
      function e(r, n, i) {
        var s = t.call(this) || this;
        return (s.parent = r), (s.outerValue = n), (s.outerIndex = i), (s.index = 0), s;
      }
      return (
        (e.prototype._next = function (r) {
          this.parent.notifyNext(this.outerValue, r, this.outerIndex, this.index++, this);
        }),
        (e.prototype._error = function (r) {
          this.parent.notifyError(r, this), this.unsubscribe();
        }),
        (e.prototype._complete = function () {
          this.parent.notifyComplete(this), this.unsubscribe();
        }),
        e
      );
    })(jI.Subscriber);
  Pi.InnerSubscriber = GI;
});
var j_ = E((uf) => {
  'use strict';
  Object.defineProperty(uf, '__esModule', { value: !0 });
  var $I = cf(),
    HI = Jl(),
    zI = mr();
  function VI(t, e, r, n, i) {
    if ((i === void 0 && (i = new $I.InnerSubscriber(t, r, n)), !i.closed))
      return e instanceof zI.Observable ? e.subscribe(i) : HI.subscribeTo(e)(i);
  }
  uf.subscribeToResult = VI;
});
var $_ = E((jn) => {
  'use strict';
  var WI =
    (jn && jn.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(jn, '__esModule', { value: !0 });
  var XI = Vr();
  function KI(t, e) {
    return function (n) {
      if (typeof t != 'function')
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
      return n.lift(new G_(t, e));
    };
  }
  jn.map = KI;
  var G_ = (function () {
    function t(e, r) {
      (this.project = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new YI(e, this.project, this.thisArg));
      }),
      t
    );
  })();
  jn.MapOperator = G_;
  var YI = (function (t) {
    WI(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.project = n), (s.count = 0), (s.thisArg = i || s), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.project.call(this.thisArg, r, this.count++);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(XI.Subscriber);
});
var z_ = E((Ui) => {
  'use strict';
  var JI =
    (Ui && Ui.__extends) ||
    (function () {
      var t = function (e, r) {
        return (
          (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (n, i) {
                n.__proto__ = i;
              }) ||
            function (n, i) {
              for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
            }),
          t(e, r)
        );
      };
      return function (e, r) {
        t(e, r);
        function n() {
          this.constructor = e;
        }
        e.prototype =
          r === null ? Object.create(r) : ((n.prototype = r.prototype), new n());
      };
    })();
  Object.defineProperty(Ui, '__esModule', { value: !0 });
  var ZI = B_(),
    QI = cf(),
    e0 = j_(),
    t0 = $_(),
    r0 = af();
  function H_(t, e) {
    return typeof e == 'function'
      ? function (r) {
          return r.pipe(
            H_(function (n, i) {
              return r0.from(t(n, i)).pipe(
                t0.map(function (s, o) {
                  return e(n, s, i, o);
                }),
              );
            }),
          );
        }
      : function (r) {
          return r.lift(new n0(t));
        };
  }
  Ui.switchMap = H_;
  var n0 = (function () {
      function t(e) {
        this.project = e;
      }
      return (
        (t.prototype.call = function (e, r) {
          return r.subscribe(new i0(e, this.project));
        }),
        t
      );
    })(),
    i0 = (function (t) {
      JI(e, t);
      function e(r, n) {
        var i = t.call(this, r) || this;
        return (i.project = n), (i.index = 0), i;
      }
      return (
        (e.prototype._next = function (r) {
          var n,
            i = this.index++;
          try {
            n = this.project(r, i);
          } catch (s) {
            this.destination.error(s);
            return;
          }
          this._innerSub(n, r, i);
        }),
        (e.prototype._innerSub = function (r, n, i) {
          var s = this.innerSubscription;
          s && s.unsubscribe();
          var o = new QI.InnerSubscriber(this, n, i),
            a = this.destination;
          a.add(o),
            (this.innerSubscription = e0.subscribeToResult(this, r, void 0, void 0, o)),
            this.innerSubscription !== o && a.add(this.innerSubscription);
        }),
        (e.prototype._complete = function () {
          var r = this.innerSubscription;
          (!r || r.closed) && t.prototype._complete.call(this), this.unsubscribe();
        }),
        (e.prototype._unsubscribe = function () {
          this.innerSubscription = null;
        }),
        (e.prototype.notifyComplete = function (r) {
          var n = this.destination;
          n.remove(r),
            (this.innerSubscription = null),
            this.isStopped && t.prototype._complete.call(this);
        }),
        (e.prototype.notifyNext = function (r, n, i, s, o) {
          this.destination.next(n);
        }),
        e
      );
    })(ZI.OuterSubscriber);
});
var lf,
  s0,
  o0,
  a0,
  V_,
  c0,
  Gn,
  ff = q(() => {
    'use strict';
    lf = require('path');
    ie();
    ({ readFile: s0, copy: o0, mkdirSync: a0 } = qo()),
      ({ output: V_, workspaceRoot: c0 } = Y()),
      (Gn = class {
        constructor(e, r) {
          this.fileStorage = e;
          this.cacheDirectory = r;
          a0(r, { recursive: !0 });
        }
        async retrieveAndExtract(e, r) {
          process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
            V_.note({ title: `Retrieving artifacts from ${r}` }),
            await this.fileStorage.retrieve(e, r, this.cacheDirectory),
            F && V_.note({ title: 'Extracting artifacts' });
          let n = (0, lf.join)(this.cacheDirectory, e, 'outputs');
          return (
            await o0(n, c0),
            (await s0((0, lf.join)(this.cacheDirectory, e, 'terminalOutput'))).toString()
          );
        }
      });
  });
function yr(t, e) {
  return !!t || !!e;
}
function Er() {
  u0.error({
    title: 'Unable to determine the context for running Nx in CI',
    bodyLines: [
      "- Nx tried to determine the context automatically but wasn't able to do it.",
      '- Use the NX_CI_EXECUTION_ID env variable to set it manually.',
      '- NX_CI_EXECUTION_ID must be a unique value for every CI execution/run.',
    ],
  });
}
var u0,
  Fi = q(() => {
    'use strict';
    ({ output: u0 } = Y());
  });
function W_(t, e, r, n, i, s, o) {
  let a = i.map((l) =>
      l.map((u) => ({
        taskId: u.id,
        hash: u.hash,
        projectName: u.target.project,
        target: u.target.target,
        configuration: u.target.configuration || null,
        params: An(u),
        projectRoot: u.projectRoot,
        cache: u.cache,
      })),
    ),
    c = {
      command: Wi(),
      branch: t,
      runGroup: e,
      ciExecutionId: r,
      ciExecutionEnv: n,
      tasks: a,
      maxParallel: l0(s),
      commitSha: o,
    };
  return da && (c.agentCount = da), oh || (c.stopAgentsOnFailure = !1), c;
}
function l0(t) {
  return t.parallel === 'false' || t.parallel === !1
    ? 1
    : t.parallel === 'true' || t.parallel === !0
    ? Number(t.maxParallel || 3)
    : t.parallel === void 0
    ? t.maxParallel
      ? Number(t.maxParallel)
      : 3
    : Number(t.parallel) || 3;
}
var hf,
  $n,
  df = q(() => {
    'use strict';
    gt();
    ie();
    So();
    Dt();
    vi();
    ({ output: hf } = Y()),
      ($n = class {
        constructor(e) {
          this.apiAxiosInstance = Te(e, 6e4);
        }
        async start(e) {
          var i;
          let r = Ce('dteStart'),
            n;
          F &&
            hf.note({
              title: 'Starting a distributed execution',
              bodyLines: [JSON.stringify(e, null, 2)],
            });
          try {
            (n = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/start', e),
            )),
              r.recordMetric(re(n));
          } catch (s) {
            throw (
              (r.recordMetric(
                (i = s == null ? void 0 : s.axiosException) != null && i.response
                  ? re(s.axiosException.response)
                  : Ie,
              ),
              s)
            );
          }
          if (!n.data.enabled)
            throw new Error(
              'Workspace is disabled. Cannot perform distributed task executions.',
            );
          if (n.data.error) throw new Error(n.data.error);
          return n.data.id;
        }
        async status(e, r) {
          var i;
          let n = Ce('dteStatus');
          try {
            let s = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/status', {
                id: e,
                prevUpdatedAt: r,
              }),
            );
            return n.recordMetric(re(s)), s.data;
          } catch (s) {
            n.recordMetric(
              (i = s == null ? void 0 : s.axiosException) != null && i.response
                ? re(s.axiosException.response)
                : Ie,
            ),
              hf.error({ title: s.message }),
              process.exit(1);
          }
        }
        async completeRunGroupWithError(e, r, n, i, s) {
          var a;
          let o = Ce('completeRunGroup');
          F &&
            hf.note({
              title: 'Completing with an error',
              bodyLines: [
                `ciExecutionId: ${n}`,
                `ciExecutionEnv: ${i}`,
                `runGroup: ${r}`,
                `error: ${s}`,
              ],
            });
          try {
            let c = await ce(
              () =>
                this.apiAxiosInstance.post('/nx-cloud/executions/complete-run-group', {
                  branch: e,
                  runGroup: r,
                  ciExecutionId: n,
                  ciExecutionEnv: i,
                  criticalErrorMessage: s,
                  vcsContext: fr(),
                }),
              3,
            );
            o.recordMetric(re(c));
          } catch (c) {
            o.recordMetric(
              (a = c == null ? void 0 : c.axiosException) != null && a.response
                ? re(c.axiosException.response)
                : Ie,
            );
          }
        }
      });
  });
function Jo(t) {
  let e = new Object(),
    r;
  return (n) => {
    e !== n
      ? ((e = n), (r = new Date()))
      : new Date().getTime() - r.getTime() > t.timeout &&
        (f0.error({ title: t.title }), process.exit(1));
  };
}
var f0,
  pf = q(() => {
    'use strict';
    ({ output: f0 } = Y());
  });
async function X_(t, e, r) {
  F && mf.note({ title: `Processing task ${r.taskId}` });
  let n = e.find((s) => r.taskId === s.id);
  if (!n) throw new Error(`Found unknown task: ${r.taskId}`);
  let i = await t.retrieveAndExtract(r.hash, r.url);
  mf.logCommand(h0(n)), process.stdout.write(i), mf.addVerticalSeparator();
}
function h0(t) {
  let e = t.target.configuration ? `:${t.target.configuration}` : '';
  return ['nx', 'run', `${t.target.project}:${t.target.target}${e}`, An(t)].join(' ');
}
var mf,
  K_ = q(() => {
    'use strict';
    ie();
    vi();
    ({ output: mf } = Y());
  });
async function Y_(t, e, r, n) {
  let i = null,
    s = {},
    o = Jo({ title: `No new completed tasks after ${ha / 1e3} seconds.`, timeout: ha });
  for (await tt(1e3); ; ) {
    F && yf.note({ title: 'Waiting...' });
    let a = await t.status(r, i);
    F &&
      yf.note({
        title: 'Status update',
        bodyLines: [
          `executionId: ${r}`,
          `executionStatus: ${a.executionStatus}`,
          `number of completed tasks: ${a.completedTasks.length}`,
          `error: ${a.criticalErrorMessage}`,
        ],
      }),
      a.criticalErrorMessage &&
        (yf.error({
          title: 'Distributed Execution Terminated',
          bodyLines: ['Error:', a.criticalErrorMessage],
        }),
        process.exit(1)),
      a.updatedAt || (await tt(5e3)),
      (i = a.updatedAt),
      o(a.completedTasks.length);
    for (let c of a.completedTasks)
      s[c.taskId] || (await X_(e, n, c), (s[c.taskId] = !0));
    if (a.executionStatus === 'COMPLETED')
      return { commandStatus: a.commandStatus, runUrl: a.runUrl };
  }
}
var yf,
  J_ = q(() => {
    'use strict';
    pf();
    ie();
    Jn();
    K_();
    ({ output: yf } = Y());
  });
function Z_(t) {
  let e = [],
    r = new Set(Object.values(t.tasks).map((i) => i.id)),
    n = 0;
  for (; r.size > 0; ) {
    let i = (e[n] = []);
    for (let s of r) {
      let o = !0;
      for (let c of t.dependencies[s])
        if (r.has(c)) {
          o = !1;
          break;
        }
      if (!o) continue;
      let a = t.tasks[s];
      i.push(a);
    }
    for (let s of i) r.delete(s.id);
    n++;
  }
  return e;
}
var Q_ = q(() => {
  'use strict';
});
var Zo = E((l1, tb) => {
  'use strict';
  var Ef = Symbol('singleComment'),
    eb = Symbol('multiComment'),
    d0 = () => '',
    p0 = (t, e, r) => t.slice(e, r).replace(/\S/g, ' '),
    m0 = (t, e) => {
      let r = e - 1,
        n = 0;
      for (; t[r] === '\\'; ) (r -= 1), (n += 1);
      return !!(n % 2);
    };
  tb.exports = (t, e = {}) => {
    if (typeof t != 'string')
      throw new TypeError(
        `Expected argument \`jsonString\` to be a \`string\`, got \`${typeof t}\``,
      );
    let r = e.whitespace === !1 ? d0 : p0,
      n = !1,
      i = !1,
      s = 0,
      o = '';
    for (let a = 0; a < t.length; a++) {
      let c = t[a],
        l = t[a + 1];
      if ((!i && c === '"' && (m0(t, a) || (n = !n)), !n)) {
        if (!i && c + l === '//') (o += t.slice(s, a)), (s = a), (i = Ef), a++;
        else if (
          i === Ef &&
          c + l ===
            `\r
`
        ) {
          a++, (i = !1), (o += r(t, s, a)), (s = a);
          continue;
        } else if (
          i === Ef &&
          c ===
            `
`
        )
          (i = !1), (o += r(t, s, a)), (s = a);
        else if (!i && c + l === '/*') {
          (o += t.slice(s, a)), (s = a), (i = eb), a++;
          continue;
        } else if (i === eb && c + l === '*/') {
          a++, (i = !1), (o += r(t, s, a + 1)), (s = a + 1);
          continue;
        }
      }
    }
    return o + (i ? r(t.slice(s)) : t.slice(s));
  };
});
function nb(t, e, r) {
  let n = JSON.parse(g0((0, rb.readFileSync)(`${y0}/nx.json`).toString()));
  return new gf(e, _0(n, t)).createTaskGraph(r);
}
function _0(t, e) {
  let r = t.targetDependencies ?? {},
    n = e ? e.strictlyOrderedTargets ?? ['build'] : [];
  for (let i of n)
    (r[i] = r[i] || []), r[i].push({ target: i, projects: 'dependencies' });
  return r;
}
var rb,
  y0,
  E0,
  g0,
  gf,
  ib = q(() => {
    'use strict';
    (rb = require('fs')),
      ({ workspaceRoot: y0 } = Y()),
      ({ getDependencyConfigs: E0 } = dt()),
      (g0 = Zo());
    gf = class {
      constructor(e, r) {
        this.projectGraph = e;
        this.defaultTargetDependencies = r;
      }
      createTaskGraph(e) {
        let r = { roots: [], tasks: {}, dependencies: {} };
        for (let n of e) {
          this.addTaskToGraph(n, r);
          let i = E0(n.target, this.defaultTargetDependencies, this.projectGraph);
          i && this.addTaskDependencies(n, i, e, r);
        }
        return (
          (r.roots = Object.keys(r.dependencies).filter(
            (n) => r.dependencies[n].length === 0,
          )),
          r
        );
      }
      addTaskDependencies(e, r, n, i) {
        for (let s of r)
          if (s.projects === 'self')
            for (let o of n)
              o.target.project === e.target.project &&
                o.target.target === s.target &&
                i.dependencies[e.id].push(o.id);
          else if (s.projects === 'dependencies') {
            let o = new Set();
            this.addDependencies(e.target.project, s.target, n, i, e.id, o);
          }
      }
      addDependencies(e, r, n, i, s, o) {
        o.add(e);
        let a = this.projectGraph.dependencies[e];
        if (a) {
          let c = a.map((l) => l.target);
          for (let l of c) {
            if (o.has(l)) continue;
            let u = this.findTask({ project: l, target: r }, n);
            u
              ? i.dependencies[s].indexOf(u.id) === -1 && i.dependencies[s].push(u.id)
              : this.addDependencies(l, r, n, i, s, o);
          }
        }
      }
      findTask({ project: e, target: r }, n) {
        return n.find((i) => i.target.project === e && i.target.target === r);
      }
      addTaskToGraph(e, r) {
        (r.tasks[e.id] = e), (r.dependencies[e.id] = []);
      }
    };
  });
var bf = {};
Nt(bf, { nxCloudDistributedTasksRunner: () => v0 });
function S0(t, e, r) {
  return t.taskGraph ? t.taskGraph : nb(r, t.projectGraph, e);
}
function w0(t, e, r, n, i) {
  process.on('SIGINT', async () => {
    await t.completeRunGroupWithError(e, r, n, i, 'Main job was terminated via SIGINT'),
      process.exit(1);
  }),
    process.on('SIGTERM', async () => {
      await t.completeRunGroupWithError(
        e,
        r,
        n,
        i,
        'Main job was terminated via SIGTERM',
      ),
        process.exit(1);
    });
}
async function R0(t, e, r, n, i, s, o, a, c, l) {
  let u = await t.start(W_(n, i, s, o, Z_(a), e, c));
  return await Y_(t, r, u, Object.values(a.tasks));
}
var Mi,
  b0,
  _f,
  v0,
  vf = q(() => {
    'use strict';
    ff();
    ie();
    Dt();
    ds();
    Fi();
    ps();
    yo();
    df();
    J_();
    Q_();
    ib();
    ({ output: Mi } = Y()),
      ({ cacheDirectory: b0 } = dt()),
      (_f = class {
        scheduleTask(e) {}
        startTask(e) {}
        endTasks(e) {}
      }),
      (v0 = async (t, e, r) => {
        e.skipNxCache &&
          Mi.warn({
            title:
              '--skip-nx-cache is ignored when using distributed tasks execution (DTE).',
            bodyLine: ['DTE needs the cache to share files between agents.'],
          }),
          F && Mi.note({ title: 'Starting distributed command execution' }),
          (e.lifeCycle = new _f());
        let n = me(),
          i = ve(),
          s = je(),
          o = xe(),
          a = et(),
          c = Vi();
        yr(i, s) || (Er(), process.exit(1));
        let l = new Yt(Rr || e.encryptionKey),
          u = new Kt(e),
          f = new Gn(new ur(l, u, e, 'dte-main'), b0),
          h = new $n(e);
        w0(h, n, i, s, o);
        try {
          let d = S0(r, t, e),
            p = await R0(h, e, f, n, i, s, o, d, a, c);
          p.commandStatus === 0
            ? Mi.success({
                title: 'Successfully completed running the command.',
                bodyLines: [`See run details at ${p.runUrl}`],
              })
            : Mi.error({
                title: 'Command execution failed.',
                bodyLines: [`See run details at ${p.runUrl}`],
              }),
            await nn(e),
            process.exit(p.commandStatus);
        } catch (d) {
          Mi.error({ title: 'Unable to complete a run.', bodyLines: [d.message] }),
            d.axiosException ? console.log(d.axiosException) : console.log(d);
          try {
            await h.completeRunGroupWithError(
              n,
              i,
              s,
              o,
              `Main job terminated with an error: "${d.message}"`,
            );
          } finally {
            process.exit(1);
          }
        }
      });
  });
var ob = {};
Nt(ob, { default: () => D0 });
function T0(t, e, r) {
  let { from: n } = af(),
    { switchMap: i } = z_();
  return n(Di(e)).pipe(
    i((s) =>
      s.data.enabled
        ? (vf(), be(bf)).nxCloudDistributedTasksRunner(t, e, r)
        : (Xr.warn({
            title: 'Nx Cloud: Workspace Disabled',
            bodyLines: [
              'This run and following runs will not use distributed task execution until',
              'the outstanding balance is paid or additional coupons are added for this',
              'workspace. If you believe you are receiving this message in error, please',
              'contact support at cloud-support@nrwl.io.',
              '',
              'Execution will now continue using this machine only.',
            ],
          }),
          (process.env.NX_INVOKED_BY_RUNNER = 'true'),
          Ai(t, e, r)),
    ),
  );
}
async function C0(t, e, r) {
  return (await Di(e)).data.enabled
    ? (vf(), be(bf)).nxCloudDistributedTasksRunner(t, e, r)
    : (Xr.warn({
        title: 'Nx Cloud: Workspace Disabled',
        bodyLines: [
          'This run and following runs will not use distributed task execution until',
          'the outstanding balance is paid.',
          '',
          'If you believe you are receiving this message in error, please',
          'contact support at cloud-support@nrwl.io.',
          '',
          'Execution will now continue using this machine only.',
        ],
      }),
      (process.env.NX_INVOKED_BY_RUNNER = 'true'),
      Ai(t, e, r));
}
function I0(t, e) {
  let r = e.cacheableOperations || [];
  return t.some((n) => Sf(n, { cacheableOperations: r }));
}
function N0(t, e) {
  let r = e.cacheableOperations || [];
  for (let n of t)
    Sf(n, { cacheableOperations: r }) ||
      (Xr.error({
        title: 'Distributed task execution only works for cacheable targets',
        bodyLines: [
          `Target '${n.target.project}:${n.target.target}' cannot be executed.`,
          'To be able to replay the output of the target, distributed task execution only supports cacheable targets.',
          `You can verify that '${n.target.target}' is part of the list of cacheable targets in the 'nx.json' file.`,
          'You can invoke this command without distribution by doing "NX_CLOUD_DISTRIBUTED_EXECUTION=false nx ...".',
        ],
      }),
      process.exit(1));
}
function A0(t, e) {
  let r = e.cacheableOperations || [];
  for (let n of t)
    Sf(n, { cacheableOperations: r }) ||
      (Xr.error({
        title: 'Distributed task execution only works for cacheable targets',
        bodyLines: [
          `Target ${n.target.project}:${n.target.target} cannot be executed.`,
          'To be able to replay the output of the target, distributed task execution only supports cacheable targets.',
          `You can still invoke "nx ${n.target.target} ${n.target.project}" from within a cacheable target when using "nx:run-commands".`,
        ],
      }),
      process.exit(Vt));
}
var Xr,
  sb,
  x0,
  Sf,
  O0,
  D0,
  ab = q(() => {
    'use strict';
    m_();
    Ml();
    Bl();
    ie();
    jl();
    ({ output: Xr } = Y()),
      ({ tasksRunner: sb, runnerReturnsPromise: x0, isCacheableTask: Sf } = dt()),
      (O0 = async (t, e, r = {}) => {
        let n = r.nxArgs || {},
          i = !At && !e.accessToken,
          s = n.cloud === !1 || ch;
        return i || s || e.skipNxCache
          ? (i &&
              Xr.warn({
                title: 'No access token found',
                bodyLines: [
                  'Nx will continue running, but nothing will be written or read from the remote cache.',
                  'Run details will also not be available in the Nx Cloud UI.',
                ],
              }),
            s &&
              Xr.warn({
                title: 'Nx Cloud Manually Disabled',
                bodyLines: [
                  'Nx will continue running, but nothing will be written or read from the remote cache.',
                  'Run details will also not be available in the Nx Cloud UI.',
                  '',
                  "If this wasn't intentional, check for the NX_NO_CLOUD environment variable, the --no-cloud flag",
                ],
              }),
            e.skipNxCache &&
              Xr.warn({
                title:
                  '--skip-nx-cache disables the connection to Nx Cloud for the current run.',
                bodyLines: [
                  'The remote cache will not be read from or written to during this run.',
                ],
              }),
            sb(t, e, r))
          : uh()
          ? I0(t, e)
            ? Ai(t, e, r, !0)
            : sb(t, e, r)
          : (ut(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID) ? A0(t, e) : await Yo(),
            O_(n.dte) && !ut(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID)
              ? (N0(t, e), x0 ? C0(t, e, r) : T0(t, e, r))
              : ((process.env.NX_INVOKED_BY_RUNNER = 'true'), Ai(t, e, r)));
      });
    D0 = O0;
  });
var wf = {};
Nt(wf, { cleanUpAgents: () => P0 });
async function P0() {
  let t = `${k0}/lockfiles`;
  return (
    F && L0.note({ title: 'Cleaning up agent metadata for this workspace.' }),
    (0, cb.rm)(t, { recursive: !0, force: !0 }, (e) => {
      if (e) throw e;
    })
  );
}
var cb,
  L0,
  k0,
  Rf = q(() => {
    'use strict';
    cb = require('fs');
    ie();
    ({ output: L0 } = Y()), ({ cacheDirectory: k0 } = dt());
  });
function Ct() {
  var n, i;
  let t = JSON.parse(U0((0, ub.readFileSync)(`${F0}/nx.json`).toString())),
    e = {},
    r = [];
  for (let s in t.targetDefaults) t.targetDefaults[s].cache && r.push(s);
  return (
    t.nxCloudAccessToken && (e.accessToken ?? (e.accessToken = t.nxCloudAccessToken)),
    t.nxCloudUrl && (e.url ?? (e.url = t.nxCloudUrl)),
    t.nxCloudEncryptionKey && (e.encryptionKey = t.nxCloudEncryptionKey),
    t.parallel && (e.parallel ?? (e.parallel = t.parallel)),
    t.cacheDirectory && (e.cacheDirectory ?? (e.cacheDirectory = t.cacheDirectory)),
    r.length && (e.cacheableOperations ?? (e.cacheableOperations = r)),
    {
      nxJson: t,
      nxCloudOptions: {
        ...e,
        ...((i = (n = t.tasksRunnerOptions) == null ? void 0 : n.default) == null
          ? void 0
          : i.options),
      },
    }
  );
}
var ub,
  U0,
  F0,
  Hn = q(() => {
    'use strict';
    (ub = require('fs')), (U0 = Zo()), ({ workspaceRoot: F0 } = Y());
  });
var xf = {};
Nt(xf, { runCommandAndStoreInCloud: () => M0 });
async function M0() {
  let { nxCloudOptions: t } = Ct(),
    e = Te(t),
    r = new $n(t),
    n = new lr(t.maskedProperties),
    i = me(),
    s = ve(),
    o = je(),
    a = xe(),
    c = q0(process.argv),
    [l, ...u] = c,
    f = new Date().toISOString(),
    { statusCode: h, terminalOutput: d } = await B0(l, u),
    p = new Date().toISOString(),
    v = {
      statusCode: h,
      terminalOutput: d,
      userCommandAndArgsString: c.join(' '),
      startTime: f,
      endTime: p,
      branch: i,
      runGroup: s,
      ciExecutionId: o,
      ciExecutionEnv: a,
    };
  await G0(e, n, t, v, r), process.exit(h);
}
function q0(t) {
  let e = t.findIndex((n) => n === 'record') + 1,
    r;
  if (e < process.argv.length) {
    let n = process.argv[e] === '--' ? 1 : 0;
    r = process.argv.slice(e + n);
  } else
    console.log(
      'Invalid command. Use `nx-cloud record [my command] [my arg1] [my arg...]`',
    ),
      process.exit(1);
  return r;
}
function B0(t, e) {
  return new Promise((r, n) => {
    try {
      let i = hb.spawn(t, e, { stdio: ['inherit', 'pipe', 'pipe', 'ipc'] }),
        s = [];
      i.stdout.on('data', (o) => {
        process.stdout.write(o), s.push(o.toString());
      }),
        i.stderr.on('data', (o) => {
          process.stderr.write(o), s.push(o.toString());
        }),
        i.on('exit', (o, a) => {
          let c = o ?? H0(a || ''),
            l = s.join('');
          r({ statusCode: c, terminalOutput: l });
        });
    } catch (i) {
      n(i);
    }
  });
}
function j0(t, e) {
  let r = t.obfuscate(e.terminalOutput),
    n =
      r.length > fb
        ? `TRUNCATED

${r.slice(r.length - fb)}`
        : r;
  return {
    taskId: 'nx-cloud-tasks-runner:record-command',
    target: 'record-command',
    projectName: 'nx-cloud-tasks-runner',
    hash: '',
    startTime: e.startTime,
    endTime: e.endTime,
    hashDetails: {},
    params: e.userCommandAndArgsString,
    cacheStatus: 'n/a',
    status: e.statusCode,
    terminalOutput: n,
  };
}
async function G0(t, e, r, n, i) {
  let s = `nx-cloud record -- ${n.userCommandAndArgsString}`,
    o = {
      meta: { nxCloudVersion: '0.0.0' },
      tasks: [j0(e, n)],
      run: {
        command: s,
        startTime: n.startTime,
        endTime: n.endTime,
        branch: n.branch,
        runGroup: n.runGroup,
        sha: n.branch ? et() : void 0,
      },
      branch: n.branch,
      runGroup: n.runGroup,
      ciExecutionId: n.ciExecutionId,
      ciExecutionEnv: n.ciExecutionEnv,
      machineInfo: Jr(),
    },
    a = Buffer.from(JSON.stringify(o)),
    c = await (0, db.promisify)(pb.gzip)(a),
    l = await ce(() =>
      t.post('/nx-cloud/runs/end', c, {
        headers: {
          ...t.defaults.headers,
          'Content-Encoding': 'gzip',
          'Content-Type': 'application/octet-stream',
        },
      }),
    );
  process.env.NX_CLOUD_SILENT_RECORD !== 'true' && $0(l.data.runUrl),
    n.statusCode !== 0 &&
      (n.ciExecutionId || n.runGroup) &&
      (await i.completeRunGroupWithError(
        n.branch,
        n.runGroup,
        n.ciExecutionId,
        n.ciExecutionEnv,
        null,
      ));
}
function $0(t) {
  lb.addVerticalSeparator(),
    lb.note({ title: 'Nx Cloud: Successfully recorded command output' }),
    Xt(`You can view or share your output by visiting ${t}`);
}
function H0(t) {
  return t === 'SIGHUP'
    ? 128 + 1
    : t === 'SIGINT'
    ? 128 + 2
    : t === 'SIGTERM'
    ? 128 + 15
    : 128;
}
var hb,
  db,
  pb,
  lb,
  fb,
  Of = q(() => {
    'use strict';
    (hb = br(require('child_process'))), (db = require('util')), (pb = require('zlib'));
    gt();
    ie();
    Hn();
    ni();
    df();
    go();
    ({ output: lb } = Y()), (fb = 2e5);
  });
function mb() {
  z0.error({
    title: 'Invalid Task Runner Configuration',
    bodyLines: [
      'To use Distributed Task Execution, your default task runner configuration must',
      'use the "nx-cloud" task runner.',
      '',
      'This can be adjusted in "nx.json".',
    ],
  });
}
var z0,
  yb = q(() => {
    'use strict';
    ({ output: z0 } = Y());
  });
var Eb,
  Qo,
  gb = q(() => {
    'use strict';
    gt();
    ie();
    Dt();
    ({ output: Eb } = Y()),
      (Qo = class {
        constructor(e, r, n, i, s, o) {
          this.branch = r;
          this.runGroup = n;
          this.ciExecutionId = i;
          this.ciExecutionEnv = s;
          this.agentName = o;
          this.apiAxiosInstance = Te(e, 6e4);
        }
        async tasks(e, r, n, i) {
          var o;
          let s = Ce('dtePollTasks');
          try {
            let a = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/tasks', {
                runGroup: this.runGroup,
                ciExecutionId: this.ciExecutionId,
                ciExecutionEnv: this.ciExecutionEnv,
                agentName: this.agentName,
                executionId: e,
                statusCode: r,
                completedTasks: n,
                targets: i,
              }),
            );
            return s.recordMetric(re(a)), a.data;
          } catch (a) {
            throw (
              (s.recordMetric(
                (o = a == null ? void 0 : a.axiosException) != null && o.response
                  ? re(a.axiosException.response)
                  : Ie,
              ),
              a)
            );
          }
        }
        async completeRunGroupWithError(e) {
          var n;
          F &&
            Eb.note({
              title: 'Completing with an error',
              bodyLines: [
                `ciExecutionId: ${this.ciExecutionId}`,
                `ciExecutionEnv: ${this.ciExecutionEnv}`,
                `runGroup: ${this.runGroup}`,
                `error: ${e}`,
              ],
            });
          let r = Ce('completeRunGroup');
          try {
            let i = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/complete-run-group', {
                branch: this.branch,
                runGroup: this.runGroup,
                ciExecutionId: this.ciExecutionId,
                ciExecutionEnv: this.ciExecutionEnv,
                agentName: this.agentName,
                criticalErrorMessage: e,
              }),
            );
            F && Eb.note({ title: 'Completed run group with an error' }),
              r.recordMetric(re(i));
          } catch (i) {
            r.recordMetric(
              (n = i == null ? void 0 : i.axiosException) != null && n.response
                ? re(i.axiosException.response)
                : Ie,
            ),
              console.error(i);
          }
        }
      });
  });
async function _b(t, e, r, n, i) {
  let s = 0,
    o = null,
    a = Jo({ title: `No new messages received after ${fa / 1e3} seconds`, timeout: fa }),
    c = [],
    l = new Date(),
    u = !1,
    f = {};
  for (;;) {
    if (
      (F && qi.note({ title: `${t} fetching tasks...` }),
      (o = await e.tasks(o ? o.executionId : null, s, c, i)),
      F &&
        qi.note({
          title: `${t} received an API Response`,
          bodyLines: [
            `completed: ${o.completed}`,
            `status: ${o.status}`,
            `retryDuring: ${o.retryDuring}`,
            `executionId: ${o.executionId}`,
            `number of tasks: ${o.tasks.length}`,
            `error: ${o.criticalErrorMessage}`,
            `maxParallel: ${o.maxParallel}`,
          ],
        }),
      o.criticalErrorMessage &&
        (qi.error({
          title: 'Distributed Execution Terminated',
          bodyLines: ['Error:', o.criticalErrorMessage],
        }),
        process.exit(1)),
      o != null &&
        o.retryDuring &&
        (o == null ? void 0 : o.retryDuring) !== 0 &&
        !u &&
        new Date().getTime() - l.getTime() > o.retryDuring)
    ) {
      await tt(2e4);
      continue;
    }
    if ((o == null ? void 0 : o.status) !== void 0) {
      if (o.status === 'RUN_GROUP_COMPLETED' || o.status === 'NO_FURTHER_TASKS_TO_RUN')
        return;
    } else if (o.completed) return;
    if ((a(o.tasks.map((d) => d.taskId).join('')), !o.executionId)) {
      F && qi.note({ title: `${t} waiting...` }), await tt(5e3), (s = 0), (c = []);
      continue;
    }
    if (((u = !0), o.completedTasks))
      for (let d of o.completedTasks)
        f[d.taskId] ||
          (qi.note({
            title: `${t} downloading artifacts for ${d.taskId} Hash: ${d.hash}}`,
          }),
          await r.retrieveAndExtract(d.hash, d.url),
          (f[d.taskId] = !0));
    let h = await n(o.executionId, o.tasks, o.maxParallel);
    for (let d of h.completedTasks) f[d.taskId] = !0;
    (s = h.completedStatusCode), (c = h.completedTasks);
  }
}
var qi,
  bb = q(() => {
    'use strict';
    pf();
    ie();
    Jn();
    ({ output: qi } = Y());
  });
var ea = E((z1, Cb) => {
  'use strict';
  var V0 = require('util'),
    vb = require('path'),
    W0 = require('fs');
  function Bi(t) {
    if (
      ((t !== t.toLowerCase() && t !== t.toUpperCase()) || (t = t.toLowerCase()),
      t.indexOf('-') === -1 && t.indexOf('_') === -1)
    )
      return t;
    {
      let r = '',
        n = !1,
        i = t.match(/^-+/);
      for (let s = i ? i[0].length : 0; s < t.length; s++) {
        let o = t.charAt(s);
        n && ((n = !1), (o = o.toUpperCase())),
          s !== 0 && (o === '-' || o === '_')
            ? (n = !0)
            : o !== '-' && o !== '_' && (r += o);
      }
      return r;
    }
  }
  function xb(t, e) {
    let r = t.toLowerCase();
    e = e || '-';
    let n = '';
    for (let i = 0; i < t.length; i++) {
      let s = r.charAt(i),
        o = t.charAt(i);
      s !== o && i > 0 ? (n += `${e}${r.charAt(i)}`) : (n += o);
    }
    return n;
  }
  function Ob(t) {
    return t == null
      ? !1
      : typeof t == 'number' || /^0x[0-9a-f]+$/i.test(t)
      ? !0
      : /^0[^.]/.test(t)
      ? !1
      : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
  }
  function X0(t) {
    if (Array.isArray(t)) return t.map((o) => (typeof o != 'string' ? o + '' : o));
    t = t.trim();
    let e = 0,
      r = null,
      n = null,
      i = null,
      s = [];
    for (let o = 0; o < t.length; o++) {
      if (((r = n), (n = t.charAt(o)), n === ' ' && !i)) {
        r !== ' ' && e++;
        continue;
      }
      n === i ? (i = null) : (n === "'" || n === '"') && !i && (i = n),
        s[e] || (s[e] = ''),
        (s[e] += n);
    }
    return s;
  }
  var pt;
  (function (t) {
    (t.BOOLEAN = 'boolean'),
      (t.STRING = 'string'),
      (t.NUMBER = 'number'),
      (t.ARRAY = 'array');
  })(pt || (pt = {}));
  var Ht,
    Af = class {
      constructor(e) {
        Ht = e;
      }
      parse(e, r) {
        let n = Object.assign(
            {
              alias: void 0,
              array: void 0,
              boolean: void 0,
              config: void 0,
              configObjects: void 0,
              configuration: void 0,
              coerce: void 0,
              count: void 0,
              default: void 0,
              envPrefix: void 0,
              narg: void 0,
              normalize: void 0,
              string: void 0,
              number: void 0,
              __: void 0,
              key: void 0,
            },
            r,
          ),
          i = X0(e),
          s = typeof e == 'string',
          o = K0(Object.assign(Object.create(null), n.alias)),
          a = Object.assign(
            {
              'boolean-negation': !0,
              'camel-case-expansion': !0,
              'combine-arrays': !1,
              'dot-notation': !0,
              'duplicate-arguments-array': !0,
              'flatten-duplicate-arrays': !0,
              'greedy-arrays': !0,
              'halt-at-non-option': !1,
              'nargs-eats-options': !1,
              'negation-prefix': 'no-',
              'parse-numbers': !0,
              'parse-positional-numbers': !0,
              'populate--': !1,
              'set-placeholder-key': !1,
              'short-option-groups': !0,
              'strip-aliased': !1,
              'strip-dashed': !1,
              'unknown-options-as-args': !1,
            },
            n.configuration,
          ),
          c = Object.assign(Object.create(null), n.default),
          l = n.configObjects || [],
          u = n.envPrefix,
          f = a['populate--'],
          h = f ? '--' : '_',
          d = Object.create(null),
          p = Object.create(null),
          v = n.__ || Ht.format,
          m = {
            aliases: Object.create(null),
            arrays: Object.create(null),
            bools: Object.create(null),
            strings: Object.create(null),
            numbers: Object.create(null),
            counts: Object.create(null),
            normalize: Object.create(null),
            configs: Object.create(null),
            nargs: Object.create(null),
            coercions: Object.create(null),
            keys: [],
          },
          w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/,
          L = new RegExp('^--' + a['negation-prefix'] + '(.+)');
        []
          .concat(n.array || [])
          .filter(Boolean)
          .forEach(function (y) {
            let _ = typeof y == 'object' ? y.key : y,
              x = Object.keys(y)
                .map(function (b) {
                  return { boolean: 'bools', string: 'strings', number: 'numbers' }[b];
                })
                .filter(Boolean)
                .pop();
            x && (m[x][_] = !0), (m.arrays[_] = !0), m.keys.push(_);
          }),
          []
            .concat(n.boolean || [])
            .filter(Boolean)
            .forEach(function (y) {
              (m.bools[y] = !0), m.keys.push(y);
            }),
          []
            .concat(n.string || [])
            .filter(Boolean)
            .forEach(function (y) {
              (m.strings[y] = !0), m.keys.push(y);
            }),
          []
            .concat(n.number || [])
            .filter(Boolean)
            .forEach(function (y) {
              (m.numbers[y] = !0), m.keys.push(y);
            }),
          []
            .concat(n.count || [])
            .filter(Boolean)
            .forEach(function (y) {
              (m.counts[y] = !0), m.keys.push(y);
            }),
          []
            .concat(n.normalize || [])
            .filter(Boolean)
            .forEach(function (y) {
              (m.normalize[y] = !0), m.keys.push(y);
            }),
          typeof n.narg == 'object' &&
            Object.entries(n.narg).forEach(([y, _]) => {
              typeof _ == 'number' && ((m.nargs[y] = _), m.keys.push(y));
            }),
          typeof n.coerce == 'object' &&
            Object.entries(n.coerce).forEach(([y, _]) => {
              typeof _ == 'function' && ((m.coercions[y] = _), m.keys.push(y));
            }),
          typeof n.config < 'u' &&
            (Array.isArray(n.config) || typeof n.config == 'string'
              ? []
                  .concat(n.config)
                  .filter(Boolean)
                  .forEach(function (y) {
                    m.configs[y] = !0;
                  })
              : typeof n.config == 'object' &&
                Object.entries(n.config).forEach(([y, _]) => {
                  (typeof _ == 'boolean' || typeof _ == 'function') && (m.configs[y] = _);
                })),
          A(n.key, o, n.default, m.arrays),
          Object.keys(c).forEach(function (y) {
            (m.aliases[y] || []).forEach(function (_) {
              c[_] = c[y];
            });
          });
        let O = null;
        zt();
        let N = [],
          P = Object.assign(Object.create(null), { _: [] }),
          I = {};
        for (let y = 0; y < i.length; y++) {
          let _ = i[y],
            x = _.replace(/^-{3,}/, '---'),
            b,
            g,
            U,
            D,
            M,
            pe;
          if (_ !== '--' && /^-/.test(_) && ct(_)) z(_);
          else if (x.match(/^---+(=|$)/)) {
            z(_);
            continue;
          } else if (_.match(/^--.+=/) || (!a['short-option-groups'] && _.match(/^-.+=/)))
            (D = _.match(/^--?([^=]+)=([\s\S]*)$/)),
              D !== null &&
                Array.isArray(D) &&
                D.length >= 3 &&
                (S(D[1], m.arrays)
                  ? (y = T(y, D[1], i, D[2]))
                  : S(D[1], m.nargs) !== !1
                  ? (y = G(y, D[1], i, D[2]))
                  : C(D[1], D[2], !0));
          else if (_.match(L) && a['boolean-negation'])
            (D = _.match(L)),
              D !== null &&
                Array.isArray(D) &&
                D.length >= 2 &&
                ((g = D[1]), C(g, S(g, m.arrays) ? [!1] : !1));
          else if (_.match(/^--.+/) || (!a['short-option-groups'] && _.match(/^-[^-]+/)))
            (D = _.match(/^--?(.+)/)),
              D !== null &&
                Array.isArray(D) &&
                D.length >= 2 &&
                ((g = D[1]),
                S(g, m.arrays)
                  ? (y = T(y, g, i))
                  : S(g, m.nargs) !== !1
                  ? (y = G(y, g, i))
                  : ((M = i[y + 1]),
                    (M !== void 0 &&
                      (!M.match(/^-/) || M.match(w)) &&
                      !S(g, m.bools) &&
                      !S(g, m.counts)) ||
                    /^(true|false)$/.test(M)
                      ? (C(g, M), y++)
                      : C(g, _e(g))));
          else if (_.match(/^-.\..+=/))
            (D = _.match(/^-([^=]+)=([\s\S]*)$/)),
              D !== null && Array.isArray(D) && D.length >= 3 && C(D[1], D[2]);
          else if (_.match(/^-.\..+/) && !_.match(w))
            (M = i[y + 1]),
              (D = _.match(/^-(.\..+)/)),
              D !== null &&
                Array.isArray(D) &&
                D.length >= 2 &&
                ((g = D[1]),
                M !== void 0 && !M.match(/^-/) && !S(g, m.bools) && !S(g, m.counts)
                  ? (C(g, M), y++)
                  : C(g, _e(g)));
          else if (_.match(/^-[^-]+/) && !_.match(w)) {
            (U = _.slice(1, -1).split('')), (b = !1);
            for (let Ue = 0; Ue < U.length; Ue++) {
              if (((M = _.slice(Ue + 2)), U[Ue + 1] && U[Ue + 1] === '=')) {
                (pe = _.slice(Ue + 3)),
                  (g = U[Ue]),
                  S(g, m.arrays)
                    ? (y = T(y, g, i, pe))
                    : S(g, m.nargs) !== !1
                    ? (y = G(y, g, i, pe))
                    : C(g, pe),
                  (b = !0);
                break;
              }
              if (M === '-') {
                C(U[Ue], M);
                continue;
              }
              if (
                /[A-Za-z]/.test(U[Ue]) &&
                /^-?\d+(\.\d*)?(e-?\d+)?$/.test(M) &&
                S(M, m.bools) === !1
              ) {
                C(U[Ue], M), (b = !0);
                break;
              }
              if (U[Ue + 1] && U[Ue + 1].match(/\W/)) {
                C(U[Ue], M), (b = !0);
                break;
              } else C(U[Ue], _e(U[Ue]));
            }
            (g = _.slice(-1)[0]),
              !b &&
                g !== '-' &&
                (S(g, m.arrays)
                  ? (y = T(y, g, i))
                  : S(g, m.nargs) !== !1
                  ? (y = G(y, g, i))
                  : ((M = i[y + 1]),
                    (M !== void 0 &&
                      (!/^(-|--)[^-]/.test(M) || M.match(w)) &&
                      !S(g, m.bools) &&
                      !S(g, m.counts)) ||
                    /^(true|false)$/.test(M)
                      ? (C(g, M), y++)
                      : C(g, _e(g))));
          } else if (_.match(/^-[0-9]$/) && _.match(w) && S(_.slice(1), m.bools))
            (g = _.slice(1)), C(g, _e(g));
          else if (_ === '--') {
            N = i.slice(y + 1);
            break;
          } else if (a['halt-at-non-option']) {
            N = i.slice(y);
            break;
          } else z(_);
        }
        $(P, !0),
          $(P, !1),
          J(P),
          K(),
          le(P, m.aliases, c, !0),
          k(P),
          a['set-placeholder-key'] && H(P),
          Object.keys(m.counts).forEach(function (y) {
            Re(P, y.split('.')) || C(y, 0);
          }),
          f && N.length && (P[h] = []),
          N.forEach(function (y) {
            P[h].push(y);
          }),
          a['camel-case-expansion'] &&
            a['strip-dashed'] &&
            Object.keys(P)
              .filter((y) => y !== '--' && y.includes('-'))
              .forEach((y) => {
                delete P[y];
              }),
          a['strip-aliased'] &&
            [].concat(...Object.keys(o).map((y) => o[y])).forEach((y) => {
              a['camel-case-expansion'] &&
                y.includes('-') &&
                delete P[
                  y
                    .split('.')
                    .map((_) => Bi(_))
                    .join('.')
                ],
                delete P[y];
            });
        function z(y) {
          let _ = V('_', y);
          (typeof _ == 'string' || typeof _ == 'number') && P._.push(_);
        }
        function G(y, _, x, b) {
          let g,
            U = S(_, m.nargs);
          if (((U = typeof U != 'number' || isNaN(U) ? 1 : U), U === 0))
            return (
              Pe(b) || (O = Error(v('Argument unexpected for: %s', _))), C(_, _e(_)), y
            );
          let D = Pe(b) ? 0 : 1;
          if (a['nargs-eats-options'])
            x.length - (y + 1) + D < U &&
              (O = Error(v('Not enough arguments following: %s', _))),
              (D = U);
          else {
            for (
              g = y + 1;
              g < x.length && (!x[g].match(/^-[^0-9]/) || x[g].match(w) || ct(x[g]));
              g++
            )
              D++;
            D < U && (O = Error(v('Not enough arguments following: %s', _)));
          }
          let M = Math.min(D, U);
          for (!Pe(b) && M > 0 && (C(_, b), M--), g = y + 1; g < M + y + 1; g++)
            C(_, x[g]);
          return y + M;
        }
        function T(y, _, x, b) {
          let g = [],
            U = b || x[y + 1],
            D = S(_, m.nargs);
          if (S(_, m.bools) && !/^(true|false)$/.test(U)) g.push(!0);
          else if (Pe(U) || (Pe(b) && /^-/.test(U) && !w.test(U) && !ct(U))) {
            if (c[_] !== void 0) {
              let M = c[_];
              g = Array.isArray(M) ? M : [M];
            }
          } else {
            Pe(b) || g.push(X(_, b, !0));
            for (
              let M = y + 1;
              M < x.length &&
              !(
                (!a['greedy-arrays'] && g.length > 0) ||
                (D && typeof D == 'number' && g.length >= D) ||
                ((U = x[M]), /^-/.test(U) && !w.test(U) && !ct(U))
              );
              M++
            )
              (y = M), g.push(X(_, U, s));
          }
          return (
            typeof D == 'number' &&
              ((D && g.length < D) || (isNaN(D) && g.length === 0)) &&
              (O = Error(v('Not enough arguments following: %s', _))),
            C(_, g),
            y
          );
        }
        function C(y, _, x = s) {
          if (/-/.test(y) && a['camel-case-expansion']) {
            let U = y
              .split('.')
              .map(function (D) {
                return Bi(D);
              })
              .join('.');
            j(y, U);
          }
          let b = X(y, _, x),
            g = y.split('.');
          R(P, g, b),
            m.aliases[y] &&
              m.aliases[y].forEach(function (U) {
                let D = U.split('.');
                R(P, D, b);
              }),
            g.length > 1 &&
              a['dot-notation'] &&
              (m.aliases[g[0]] || []).forEach(function (U) {
                let D = U.split('.'),
                  M = [].concat(g);
                M.shift(),
                  (D = D.concat(M)),
                  (m.aliases[y] || []).includes(D.join('.')) || R(P, D, b);
              }),
            S(y, m.normalize) &&
              !S(y, m.arrays) &&
              [y].concat(m.aliases[y] || []).forEach(function (D) {
                Object.defineProperty(I, D, {
                  enumerable: !0,
                  get() {
                    return _;
                  },
                  set(M) {
                    _ = typeof M == 'string' ? Ht.normalize(M) : M;
                  },
                });
              });
        }
        function j(y, _) {
          (m.aliases[y] && m.aliases[y].length) || ((m.aliases[y] = [_]), (d[_] = !0)),
            (m.aliases[_] && m.aliases[_].length) || j(_, y);
        }
        function X(y, _, x) {
          x && (_ = Y0(_)),
            (S(y, m.bools) || S(y, m.counts)) &&
              typeof _ == 'string' &&
              (_ = _ === 'true');
          let b = Array.isArray(_)
            ? _.map(function (g) {
                return V(y, g);
              })
            : V(y, _);
          return (
            S(y, m.counts) && (Pe(b) || typeof b == 'boolean') && (b = Tf()),
            S(y, m.normalize) &&
              S(y, m.arrays) &&
              (Array.isArray(_)
                ? (b = _.map((g) => Ht.normalize(g)))
                : (b = Ht.normalize(_))),
            b
          );
        }
        function V(y, _) {
          return (
            (!a['parse-positional-numbers'] && y === '_') ||
              (!S(y, m.strings) &&
                !S(y, m.bools) &&
                !Array.isArray(_) &&
                ((Ob(_) &&
                  a['parse-numbers'] &&
                  Number.isSafeInteger(Math.floor(parseFloat(`${_}`)))) ||
                  (!Pe(_) && S(y, m.numbers))) &&
                (_ = Number(_))),
            _
          );
        }
        function J(y) {
          let _ = Object.create(null);
          le(_, m.aliases, c),
            Object.keys(m.configs).forEach(function (x) {
              let b = y[x] || _[x];
              if (b)
                try {
                  let g = null,
                    U = Ht.resolve(Ht.cwd(), b),
                    D = m.configs[x];
                  if (typeof D == 'function') {
                    try {
                      g = D(U);
                    } catch (M) {
                      g = M;
                    }
                    if (g instanceof Error) {
                      O = g;
                      return;
                    }
                  } else g = Ht.require(U);
                  B(g);
                } catch (g) {
                  g.name === 'PermissionDenied'
                    ? (O = g)
                    : y[x] && (O = Error(v('Invalid JSON config file: %s', b)));
                }
            });
        }
        function B(y, _) {
          Object.keys(y).forEach(function (x) {
            let b = y[x],
              g = _ ? _ + '.' + x : x;
            typeof b == 'object' && b !== null && !Array.isArray(b) && a['dot-notation']
              ? B(b, g)
              : (!Re(P, g.split('.')) || (S(g, m.arrays) && a['combine-arrays'])) &&
                C(g, b);
          });
        }
        function K() {
          typeof l < 'u' &&
            l.forEach(function (y) {
              B(y);
            });
        }
        function $(y, _) {
          if (typeof u > 'u') return;
          let x = typeof u == 'string' ? u : '',
            b = Ht.env();
          Object.keys(b).forEach(function (g) {
            if (x === '' || g.lastIndexOf(x, 0) === 0) {
              let U = g.split('__').map(function (D, M) {
                return M === 0 && (D = D.substring(x.length)), Bi(D);
              });
              ((_ && m.configs[U.join('.')]) || !_) && !Re(y, U) && C(U.join('.'), b[g]);
            }
          });
        }
        function k(y) {
          let _,
            x = new Set();
          Object.keys(y).forEach(function (b) {
            if (!x.has(b) && ((_ = S(b, m.coercions)), typeof _ == 'function'))
              try {
                let g = V(b, _(y[b]));
                [].concat(m.aliases[b] || [], b).forEach((U) => {
                  x.add(U), (y[U] = g);
                });
              } catch (g) {
                O = g;
              }
          });
        }
        function H(y) {
          return (
            m.keys.forEach((_) => {
              ~_.indexOf('.') || (typeof y[_] > 'u' && (y[_] = void 0));
            }),
            y
          );
        }
        function le(y, _, x, b = !1) {
          Object.keys(x).forEach(function (g) {
            Re(y, g.split('.')) ||
              (R(y, g.split('.'), x[g]),
              b && (p[g] = !0),
              (_[g] || []).forEach(function (U) {
                Re(y, U.split('.')) || R(y, U.split('.'), x[g]);
              }));
          });
        }
        function Re(y, _) {
          let x = y;
          a['dot-notation'] || (_ = [_.join('.')]),
            _.slice(0, -1).forEach(function (g) {
              x = x[g] || {};
            });
          let b = _[_.length - 1];
          return typeof x != 'object' ? !1 : b in x;
        }
        function R(y, _, x) {
          let b = y;
          a['dot-notation'] || (_ = [_.join('.')]),
            _.slice(0, -1).forEach(function (pe) {
              (pe = Sb(pe)),
                typeof b == 'object' && b[pe] === void 0 && (b[pe] = {}),
                typeof b[pe] != 'object' || Array.isArray(b[pe])
                  ? (Array.isArray(b[pe]) ? b[pe].push({}) : (b[pe] = [b[pe], {}]),
                    (b = b[pe][b[pe].length - 1]))
                  : (b = b[pe]);
            });
          let g = Sb(_[_.length - 1]),
            U = S(_.join('.'), m.arrays),
            D = Array.isArray(x),
            M = a['duplicate-arguments-array'];
          !M &&
            S(g, m.nargs) &&
            ((M = !0),
            ((!Pe(b[g]) && m.nargs[g] === 1) ||
              (Array.isArray(b[g]) && b[g].length === m.nargs[g])) &&
              (b[g] = void 0)),
            x === Tf()
              ? (b[g] = Tf(b[g]))
              : Array.isArray(b[g])
              ? M && U && D
                ? (b[g] = a['flatten-duplicate-arrays']
                    ? b[g].concat(x)
                    : (Array.isArray(b[g][0]) ? b[g] : [b[g]]).concat([x]))
                : !M && !!U == !!D
                ? (b[g] = x)
                : (b[g] = b[g].concat([x]))
              : b[g] === void 0 && U
              ? (b[g] = D ? x : [x])
              : M && !(b[g] === void 0 || S(g, m.counts) || S(g, m.bools))
              ? (b[g] = [b[g], x])
              : (b[g] = x);
        }
        function A(...y) {
          y.forEach(function (_) {
            Object.keys(_ || {}).forEach(function (x) {
              m.aliases[x] ||
                ((m.aliases[x] = [].concat(o[x] || [])),
                m.aliases[x].concat(x).forEach(function (b) {
                  if (/-/.test(b) && a['camel-case-expansion']) {
                    let g = Bi(b);
                    g !== x &&
                      m.aliases[x].indexOf(g) === -1 &&
                      (m.aliases[x].push(g), (d[g] = !0));
                  }
                }),
                m.aliases[x].concat(x).forEach(function (b) {
                  if (b.length > 1 && /[A-Z]/.test(b) && a['camel-case-expansion']) {
                    let g = xb(b, '-');
                    g !== x &&
                      m.aliases[x].indexOf(g) === -1 &&
                      (m.aliases[x].push(g), (d[g] = !0));
                  }
                }),
                m.aliases[x].forEach(function (b) {
                  m.aliases[b] = [x].concat(
                    m.aliases[x].filter(function (g) {
                      return b !== g;
                    }),
                  );
                }));
            });
          });
        }
        function S(y, _) {
          let x = [].concat(m.aliases[y] || [], y),
            b = Object.keys(_),
            g = x.find((U) => b.includes(U));
          return g ? _[g] : !1;
        }
        function W(y) {
          let _ = Object.keys(m);
          return [].concat(_.map((b) => m[b])).some(function (b) {
            return Array.isArray(b) ? b.includes(y) : b[y];
          });
        }
        function de(y, ..._) {
          return [].concat(..._).some(function (b) {
            let g = y.match(b);
            return g && W(g[1]);
          });
        }
        function It(y) {
          if (y.match(w) || !y.match(/^-[^-]+/)) return !1;
          let _ = !0,
            x,
            b = y.slice(1).split('');
          for (let g = 0; g < b.length; g++) {
            if (((x = y.slice(g + 2)), !W(b[g]))) {
              _ = !1;
              break;
            }
            if (
              (b[g + 1] && b[g + 1] === '=') ||
              x === '-' ||
              (/[A-Za-z]/.test(b[g]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(x)) ||
              (b[g + 1] && b[g + 1].match(/\W/))
            )
              break;
          }
          return _;
        }
        function ct(y) {
          return a['unknown-options-as-args'] && yt(y);
        }
        function yt(y) {
          return (
            (y = y.replace(/^-{3,}/, '--')),
            y.match(w) || It(y)
              ? !1
              : !de(
                  y,
                  /^-+([^=]+?)=[\s\S]*$/,
                  L,
                  /^-+([^=]+?)$/,
                  /^-+([^=]+?)-$/,
                  /^-+([^=]+?\d+)$/,
                  /^-+([^=]+?)\W+.*$/,
                )
          );
        }
        function _e(y) {
          return !S(y, m.bools) && !S(y, m.counts) && `${y}` in c ? c[y] : Yr(_r(y));
        }
        function Yr(y) {
          return {
            [pt.BOOLEAN]: !0,
            [pt.STRING]: '',
            [pt.NUMBER]: void 0,
            [pt.ARRAY]: [],
          }[y];
        }
        function _r(y) {
          let _ = pt.BOOLEAN;
          return (
            S(y, m.strings)
              ? (_ = pt.STRING)
              : S(y, m.numbers)
              ? (_ = pt.NUMBER)
              : S(y, m.bools)
              ? (_ = pt.BOOLEAN)
              : S(y, m.arrays) && (_ = pt.ARRAY),
            _
          );
        }
        function Pe(y) {
          return y === void 0;
        }
        function zt() {
          Object.keys(m.counts).find((y) =>
            S(y, m.arrays)
              ? ((O = Error(
                  v('Invalid configuration: %s, opts.count excludes opts.array.', y),
                )),
                !0)
              : S(y, m.nargs)
              ? ((O = Error(
                  v('Invalid configuration: %s, opts.count excludes opts.narg.', y),
                )),
                !0)
              : !1,
          );
        }
        return {
          aliases: Object.assign({}, m.aliases),
          argv: Object.assign(I, P),
          configuration: a,
          defaulted: Object.assign({}, p),
          error: O,
          newAliases: Object.assign({}, d),
        };
      }
    };
  function K0(t) {
    let e = [],
      r = Object.create(null),
      n = !0;
    for (
      Object.keys(t).forEach(function (i) {
        e.push([].concat(t[i], i));
      });
      n;

    ) {
      n = !1;
      for (let i = 0; i < e.length; i++)
        for (let s = i + 1; s < e.length; s++)
          if (
            e[i].filter(function (a) {
              return e[s].indexOf(a) !== -1;
            }).length
          ) {
            (e[i] = e[i].concat(e[s])), e.splice(s, 1), (n = !0);
            break;
          }
    }
    return (
      e.forEach(function (i) {
        i = i.filter(function (o, a, c) {
          return c.indexOf(o) === a;
        });
        let s = i.pop();
        s !== void 0 && typeof s == 'string' && (r[s] = i);
      }),
      r
    );
  }
  function Tf(t) {
    return t !== void 0 ? t + 1 : 1;
  }
  function Sb(t) {
    return t === '__proto__' ? '___proto___' : t;
  }
  function Y0(t) {
    return typeof t == 'string' &&
      (t[0] === "'" || t[0] === '"') &&
      t[t.length - 1] === t[0]
      ? t.substring(1, t.length - 1)
      : t;
  }
  var Cf,
    If,
    Nf,
    wb =
      process && process.env && process.env.YARGS_MIN_NODE_VERSION
        ? Number(process.env.YARGS_MIN_NODE_VERSION)
        : 12,
    Rb =
      (If =
        (Cf = process == null ? void 0 : process.versions) === null || Cf === void 0
          ? void 0
          : Cf.node) !== null && If !== void 0
        ? If
        : (Nf = process == null ? void 0 : process.version) === null || Nf === void 0
        ? void 0
        : Nf.slice(1);
  if (Rb && Number(Rb.match(/^([^.]+)/)[1]) < wb)
    throw Error(
      `yargs parser supports a minimum Node.js version of ${wb}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`,
    );
  var J0 = process ? process.env : {},
    Tb = new Af({
      cwd: process.cwd,
      env: () => J0,
      format: V0.format,
      normalize: vb.normalize,
      resolve: vb.resolve,
      require: (t) => {
        if (typeof require < 'u') return require(t);
        if (t.match(/\.json$/)) return JSON.parse(W0.readFileSync(t, 'utf8'));
        throw Error('only .json config files are supported in ESM');
      },
    }),
    ji = function (e, r) {
      return Tb.parse(e.slice(), r).argv;
    };
  ji.detailed = function (t, e) {
    return Tb.parse(t.slice(), e);
  };
  ji.camelCase = Bi;
  ji.decamelize = xb;
  ji.looksLikeNumber = Ob;
  Cb.exports = ji;
});
async function Ib(t) {
  let e = await Z0(t);
  return async (r, n, i) => {
    let s = n.map((c) => {
      let l = Q0(c.params, {
          configuration: { 'camel-case-expansion': !1, 'dot-notation': !0 },
        }),
        u = Au(l);
      return (
        l._.length == 0 && delete l._,
        {
          id: c.taskId,
          target: {
            project: c.projectName,
            target: c.target,
            configuration: c.configuration,
          },
          overrides: { ...l, __overrides_unparsed__: u },
          projectRoot: c.projectRoot,
          cache: c.cache,
        }
      );
    });
    (process.env.NX_CACHE_FAILURES = 'true'),
      (process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID = r),
      (process.env.NX_STREAM_OUTPUT = 'true'),
      (process.env.NX_PREFIX_OUTPUT = 'true');
    let o = await e.invoke({ tasks: s, parallel: i });
    return {
      completedTasks: Object.values(o.taskGraph.tasks).map((c) => ({
        taskId: c.id,
        hash: c.hash,
      })),
      completedStatusCode: o.status,
    };
  };
}
var Z0,
  Q0,
  Nb = q(() => {
    'use strict';
    vi();
    ({ initTasksRunner: Z0 } = dt()), (Q0 = ea());
  });
async function Db() {
  let t = nN();
  return async function (r, n, i) {
    let s = 0,
      o = [];
    for (let a of rN(n)) {
      let c = a.configuration ? `--configuration=${a.configuration}` : '',
        l = i > 1 ? ` --parallel --max-parallel=${i}` : '',
        u = `npx nx run-many --target=${a.target} ${c} --projects=${a.projects.join(
          ',',
        )} ${a.params}${l}`;
      F && eN.note({ title: `Executing: '${u}'` });
      try {
        (0, Ab.execSync)(u, {
          stdio: ['ignore', 'inherit', 'inherit'],
          env: {
            ...process.env,
            NX_CACHE_FAILURES: 'true',
            NX_CLOUD_DISTRIBUTED_EXECUTION_ID: r,
            NX_STREAM_OUTPUT: 'true',
            NX_PREFIX_OUTPUT: 'true',
          },
        }),
          o.push(...t(r));
      } catch (f) {
        if (f.status === Vt) throw f;
        (s = 1), o.push(...t(r));
      }
    }
    return { completedStatusCode: s, completedTasks: o };
  };
}
function rN(t) {
  let e = [];
  return (
    t.forEach((r) => {
      let n = e.find((i) => i.target === r.target && i.configuration === r.configuration);
      n
        ? n.projects.push(r.projectName)
        : e.push({
            target: r.target,
            projects: [r.projectName],
            params: r.params,
            configuration: r.configuration,
          });
    }),
    e
  );
}
function nN() {
  return (t) => {
    let e = `Command execution failed (distributed task execution: ${t}). Tasks hashes haven't been recorded.`,
      r;
    try {
      let n = `${tN}/tasks-hashes-${t}`;
      (r = JSON.parse((0, ta.readFileSync)(n).toString())), (0, ta.unlinkSync)(n);
    } catch {
      throw new Error(e);
    }
    if (r.length == 0) throw new Error(e);
    return r;
  };
}
var Ab,
  ta,
  eN,
  tN,
  Lb = q(() => {
    'use strict';
    (Ab = require('child_process')), (ta = require('fs'));
    ie();
    ({ output: eN } = Y()), ({ cacheDirectory: tN } = dt());
  });
var Lf = {};
Nt(Lf, { startAgent: () => oN });
async function oN() {
  let t = me(),
    e = ve(),
    r = je(),
    n = xe();
  yr(e, r) || (Er(), process.exit(1)),
    gr.targets && gr.targets.length
      ? Gi.note({
          title: `Starting an agent for running Nx target(s) [${gr.targets.join(', ')}]`,
        })
      : Gi.note({ title: 'Starting an agent for running Nx tasks' });
  let { nxJson: i, nxCloudOptions: s } = Ct();
  function o() {
    var v;
    let p = (v = i.tasksRunnerOptions) == null ? void 0 : v.default;
    return i.nxCloudAccessToken && !p
      ? !0
      : (!(p != null && p.runner) && process.env.NX_CLOUD_ACCESS_TOKEN) ||
          (!(p != null && p.runner) && i.nxCloudAccessToken) ||
          (p == null ? void 0 : p.runner) === 'nx-cloud' ||
          (p == null ? void 0 : p.runner) === '@nrwl/nx-cloud';
  }
  if (!o()) return mb(), process.exit(1);
  (await Di(s)) ||
    (Gi.error({
      title: 'Nx Cloud: Workspace is disabled',
      bodyLines: [
        'Distributed Task Execution is disabled when your workspace is disabled',
        '',
        "Organization administrators can find more information on the 'Billing and Plans' page in the Nx Cloud Webapp",
      ],
    }),
    process.exit(1));
  let c = aN(),
    l = new Qo(s, t, e, r, n, c);
  cN(l, s, c);
  let u = new Yt(Rr || s.encryptionKey),
    f = new Kt(s),
    h = new Gn(new ur(u, f, s, 'dte-agent'), kb),
    d = sN ? await Ib(s) : await Db();
  return _b(c, l, h, d, gr.targets)
    .then(async (p) => (await nn(s), p))
    .catch(async (p) => {
      throw (
        (await l.completeRunGroupWithError(`Critical Error in Agent: "${p.message}"`), p)
      );
    });
}
function aN() {
  return process.env.NX_AGENT_NAME !== void 0
    ? process.env.NX_AGENT_NAME
    : process.env.CIRCLECI !== void 0 && process.env.CIRCLE_STAGE
    ? process.env.CIRCLE_STAGE
    : process.env.CIRCLECI !== void 0 && process.env.CIRCLE_JOB
    ? process.env.CIRCLE_JOB
    : `Agent ${Math.floor(Math.random() * 1e5)}`;
}
function cN(t, e, r) {
  let n = `${kb}/lockfiles`,
    i = `${n}/${r}.lock`;
  (0, mt.existsSync)(n) || (0, mt.mkdirSync)(n, { recursive: !0 });
  let s = (0, mt.readdirSync)(n);
  s.length &&
    (s.includes(`${r}.lock`) &&
      (Gi.error({
        title: 'Duplicate Agent ID Detected',
        bodyLines: [
          'We have detected another agent with this ID running in this workspace. This should not happen.',
          '',
          'End all currently running agents, run "npx nx-cloud clean-up-agents", and try again.',
        ],
      }),
      process.exit(1)),
    Gi.warn({
      title: 'Other Nx Cloud Agents Detected',
      bodyLines: [
        'We have detected other agents running in this workspace. This can cause unexpected behavior.',
        '',
        'This can also be a false positive caused by agents that did not shut down correctly.',
        'If you believe this is the case, run "npx nx-cloud clean-up-agents".',
      ],
    })),
    (0, mt.writeFileSync)(i, ''),
    process.on('exit', (o) => {
      Df(i, o);
    }),
    process.on('SIGTERM', async () => {
      await t.completeRunGroupWithError('Agent was terminated via SIGTERM'), Df(i, 1);
    }),
    process.on('SIGINT', async () => {
      await t.completeRunGroupWithError('Agent was terminated via SIGINT'), Df(i, 1);
    });
}
function Df(t, e) {
  (0, mt.existsSync)(t) && ((0, mt.unlinkSync)(t), process.exit(e));
}
var mt,
  iN,
  lP,
  Gi,
  fP,
  sN,
  kb,
  gr,
  kf = q(() => {
    'use strict';
    mt = require('fs');
    ff();
    ie();
    Hn();
    jl();
    Dt();
    ds();
    yb();
    Fi();
    ps();
    yo();
    gb();
    bb();
    Nb();
    Lb();
    (iN = ea()),
      (lP = Zo()),
      ({ output: Gi, workspaceRoot: fP } = Y()),
      ({ initTasksRunner: sN, cacheDirectory: kb } = dt()),
      (gr = iN(process.argv, { array: ['targets'], default: {} }));
    gr.targets &&
      gr.targets.length === 1 &&
      (gr.targets = gr.targets[0].split(',').map((t) => t.trim()));
  });
function Ub(t) {
  if (['.yml', '.yaml'].some((n) => (t == null ? void 0 : t.endsWith(n))))
    try {
      let n = (a) =>
          (0, Pb.execSync)(`${a}`, { stdio: 'pipe' })
            .toString()
            .trim()
            .split(
              `
`,
            )
            .filter(Boolean),
        i = n('npx nx show projects --affected'),
        s = n('npx nx show projects'),
        o = i.length / s.length;
      return Math.round(o * 100);
    } catch {
      return;
    }
}
var Pb,
  Fb = q(() => {
    'use strict';
    Pb = require('child_process');
  });
var Pf,
  zn,
  Uf = q(() => {
    'use strict';
    gt();
    So();
    Dt();
    ({ output: Pf } = Y()),
      (zn = class {
        constructor(e) {
          this.apiAxiosInstance = Te(e);
        }
        async createRunGroup(e, r, n, i, s, o, a, c, l, u, f) {
          var d;
          let h = Ce('createRunGroup');
          try {
            let p = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/create-run-group', {
                branch: e,
                runGroup: r,
                ciExecutionId: n,
                ciExecutionEnv: i,
                stopAgentsOnFailure: s,
                agentCount: o,
                stopAgentsAfter: a,
                commitSha: l,
                distributesOn: c,
                affectedProjectRatio: f,
                vcsContext: fr(),
              }),
            );
            h.recordMetric(re(p));
          } catch (p) {
            h.recordMetric(
              (d = p == null ? void 0 : p.axiosException) != null && d.response
                ? re(p.axiosException.response)
                : Ie,
            ),
              Pf.error({ title: p.message }),
              process.exit(1);
          }
        }
        async completeRunGroup(e, r, n, i) {
          var o;
          let s = Ce('completeRunGroup');
          try {
            let a = await ce(() =>
              this.apiAxiosInstance.post('/nx-cloud/executions/complete-run-group', {
                branch: e,
                runGroup: r,
                ciExecutionId: n,
                ciExecutionEnv: i,
                vcsContext: fr(),
              }),
            );
            s.recordMetric(re(a));
          } catch (a) {
            s.recordMetric(
              (o = a == null ? void 0 : a.axiosException) != null && o.response
                ? re(a.axiosException.response)
                : Ie,
            ),
              Pf.error({ title: a.message }),
              process.exit(1);
          }
        }
        async sendHeartbeat(e, r) {
          try {
            await this.apiAxiosInstance.post('/nx-cloud/heartbeat', {
              ciExecutionId: e,
              runGroup: r,
            });
          } catch (n) {
            Pf.error({
              title: n.message,
              bodyLines: JSON.stringify(n, null, 2).split(`
`),
            }),
              process.exit(1);
          }
        }
      });
  });
var Ff = {};
Nt(Ff, { startCiRun: () => lN });
async function lN() {
  let t = me(),
    e = ve(),
    r = je(),
    n = xe(),
    i = et(),
    s = Vi(),
    o = Ub(Kr.distributesOn);
  yr(e, r) || (Er(), process.exit(1)),
    F &&
      Mb.note({
        title: `Creating run group. branch: ${t}, ciExecutionId: ${r}, ciExecutionEnv: ${n}, runGroup: ${e}, commitSha: ${i}`,
      }),
    Kr.commandCount &&
      (Mb.error({
        title: '--command-count is deprecated. Use --stop-agents-after instead.',
        bodyLines: ['E.g., npx nx-cloud start-ci-run --stop-agents-after="e2e"'],
      }),
      process.exit(1));
  let { nxCloudOptions: a } = Ct();
  await new zn(a).createRunGroup(
    t,
    e,
    r,
    n,
    Kr.stopAgentsOnFailure,
    Kr.agentCount,
    Kr.stopAgentsAfter,
    Kr.distributesOn,
    i,
    s,
    o,
  ),
    await Yo(),
    Kr.useDteByDefault && x_();
}
var uN,
  Mb,
  RP,
  Kr,
  Mf = q(() => {
    'use strict';
    Ml();
    Bl();
    ie();
    Fb();
    Hn();
    Uf();
    Fi();
    (uN = ea()),
      ({ output: Mb, workspaceRoot: RP } = Y()),
      (Kr = uN(process.argv, {
        boolean: ['stop-agents-on-failure', 'use-dte-by-default'],
        number: ['agent-count', 'command-count'],
        string: ['stop-agents-after'],
        default: { useDteByDefault: !0 },
      }));
  });
var ra = {};
Nt(ra, { stopAllAgents: () => hN });
async function hN() {
  let t = me(),
    e = ve(),
    r = je(),
    n = xe();
  yr(e, r) || (Er(), process.exit(1)),
    F &&
      fN.note({
        title: `Stopping all agents running tasks for run group. branch: ${t}, ciExecutionId: ${r}, ciExecutionEnv: ${n}, runGroup: ${e}`,
      });
  let { nxCloudOptions: i } = Ct();
  await new zn(i).completeRunGroup(t, e, r, n);
}
var fN,
  na = q(() => {
    'use strict';
    ie();
    Hn();
    Uf();
    Fi();
    ({ output: fN } = Y());
  });
var Bf = E((IP, Bb) => {
  'use strict';
  var qb = require('fs'),
    qf;
  function dN() {
    try {
      return qb.statSync('/.dockerenv'), !0;
    } catch {
      return !1;
    }
  }
  function pN() {
    try {
      return qb.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
    } catch {
      return !1;
    }
  }
  Bb.exports = () => (qf === void 0 && (qf = dN() || pN()), qf);
});
var $b = E((NP, jf) => {
  'use strict';
  var mN = require('os'),
    yN = require('fs'),
    jb = Bf(),
    Gb = () => {
      if (process.platform !== 'linux') return !1;
      if (mN.release().toLowerCase().includes('microsoft')) return !jb();
      try {
        return yN
          .readFileSync('/proc/version', 'utf8')
          .toLowerCase()
          .includes('microsoft')
          ? !jb()
          : !1;
      } catch {
        return !1;
      }
    };
  process.env.__IS_WSL_TEST__ ? (jf.exports = Gb) : (jf.exports = Gb());
});
var zb = E((AP, Hb) => {
  'use strict';
  Hb.exports = (t, e, r) => {
    let n = (i) =>
      Object.defineProperty(t, e, { value: i, enumerable: !0, writable: !0 });
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get() {
          let i = r();
          return n(i), i;
        },
        set(i) {
          n(i);
        },
      }),
      t
    );
  };
});
var Zb = E((DP, Jb) => {
  'use strict';
  var EN = require('path'),
    gN = require('child_process'),
    { promises: sa, constants: Yb } = require('fs'),
    ia = $b(),
    _N = Bf(),
    $f = zb(),
    Vb = EN.join(__dirname, 'xdg-open'),
    { platform: Vn, arch: Wb } = process,
    bN = () => {
      try {
        return sa.statSync('/run/.containerenv'), !0;
      } catch {
        return !1;
      }
    },
    Gf;
  function vN() {
    return Gf === void 0 && (Gf = bN() || _N()), Gf;
  }
  var SN = (() => {
      let t = '/mnt/',
        e;
      return async function () {
        if (e) return e;
        let r = '/etc/wsl.conf',
          n = !1;
        try {
          await sa.access(r, Yb.F_OK), (n = !0);
        } catch {}
        if (!n) return t;
        let i = await sa.readFile(r, { encoding: 'utf8' }),
          s = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(i);
        return s
          ? ((e = s.groups.mountPoint.trim()), (e = e.endsWith('/') ? e : `${e}/`), e)
          : t;
      };
    })(),
    Xb = async (t, e) => {
      let r;
      for (let n of t)
        try {
          return await e(n);
        } catch (i) {
          r = i;
        }
      throw r;
    },
    oa = async (t) => {
      if (
        ((t = {
          wait: !1,
          background: !1,
          newInstance: !1,
          allowNonzeroExitCode: !1,
          ...t,
        }),
        Array.isArray(t.app))
      )
        return Xb(t.app, (a) => oa({ ...t, app: a }));
      let { name: e, arguments: r = [] } = t.app || {};
      if (((r = [...r]), Array.isArray(e)))
        return Xb(e, (a) => oa({ ...t, app: { name: a, arguments: r } }));
      let n,
        i = [],
        s = {};
      if (Vn === 'darwin')
        (n = 'open'),
          t.wait && i.push('--wait-apps'),
          t.background && i.push('--background'),
          t.newInstance && i.push('--new'),
          e && i.push('-a', e);
      else if (Vn === 'win32' || (ia && !vN() && !e)) {
        let a = await SN();
        (n = ia
          ? `${a}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`
          : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`),
          i.push(
            '-NoProfile',
            '-NonInteractive',
            '\u2013ExecutionPolicy',
            'Bypass',
            '-EncodedCommand',
          ),
          ia || (s.windowsVerbatimArguments = !0);
        let c = ['Start'];
        t.wait && c.push('-Wait'),
          e
            ? (c.push(`"\`"${e}\`""`, '-ArgumentList'), t.target && r.unshift(t.target))
            : t.target && c.push(`"${t.target}"`),
          r.length > 0 && ((r = r.map((l) => `"\`"${l}\`""`)), c.push(r.join(','))),
          (t.target = Buffer.from(c.join(' '), 'utf16le').toString('base64'));
      } else {
        if (e) n = e;
        else {
          let a = !__dirname || __dirname === '/',
            c = !1;
          try {
            await sa.access(Vb, Yb.X_OK), (c = !0);
          } catch {}
          n = process.versions.electron || Vn === 'android' || a || !c ? 'xdg-open' : Vb;
        }
        r.length > 0 && i.push(...r), t.wait || ((s.stdio = 'ignore'), (s.detached = !0));
      }
      t.target && i.push(t.target),
        Vn === 'darwin' && r.length > 0 && i.push('--args', ...r);
      let o = gN.spawn(n, i, s);
      return t.wait
        ? new Promise((a, c) => {
            o.once('error', c),
              o.once('close', (l) => {
                if (!t.allowNonzeroExitCode && l > 0) {
                  c(new Error(`Exited with code ${l}`));
                  return;
                }
                a(o);
              });
          })
        : (o.unref(), o);
    },
    Hf = (t, e) => {
      if (typeof t != 'string') throw new TypeError('Expected a `target`');
      return oa({ ...e, target: t });
    },
    wN = (t, e) => {
      if (typeof t != 'string') throw new TypeError('Expected a `name`');
      let { arguments: r = [] } = e || {};
      if (r != null && !Array.isArray(r))
        throw new TypeError('Expected `appArguments` as Array type');
      return oa({ ...e, app: { name: t, arguments: r } });
    };
  function Kb(t) {
    if (typeof t == 'string' || Array.isArray(t)) return t;
    let { [Wb]: e } = t;
    if (!e) throw new Error(`${Wb} is not supported`);
    return e;
  }
  function zf({ [Vn]: t }, { wsl: e }) {
    if (e && ia) return Kb(e);
    if (!t) throw new Error(`${Vn} is not supported`);
    return Kb(t);
  }
  var aa = {};
  $f(aa, 'chrome', () =>
    zf(
      {
        darwin: 'google chrome',
        win32: 'chrome',
        linux: ['google-chrome', 'google-chrome-stable', 'chromium'],
      },
      {
        wsl: {
          ia32: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
          x64: [
            '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
            '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
          ],
        },
      },
    ),
  );
  $f(aa, 'firefox', () =>
    zf(
      {
        darwin: 'firefox',
        win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
        linux: 'firefox',
      },
      { wsl: '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' },
    ),
  );
  $f(aa, 'edge', () =>
    zf(
      {
        darwin: 'microsoft edge',
        win32: 'msedge',
        linux: ['microsoft-edge', 'microsoft-edge-dev'],
      },
      { wsl: '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' },
    ),
  );
  Hf.apps = aa;
  Hf.openApp = wN;
  Jb.exports = Hf;
});
function Qb() {
  let { output: t } = Y();
  t.error({
    title: 'Connections to Nx Cloud are disabled for this workspace',
    bodyLines: [
      'This was an intentional decision by someone on your team.',
      'Nx Cloud cannot and will not be enabled.',
      '',
      "To allow connections to Nx Cloud again, remove the 'neverConnectToCloud'",
      'property in nx.json.',
    ],
  });
}
var ev = q(() => {
  'use strict';
});
var Vf = {};
Nt(Vf, { uploadAndShowRunDetails: () => ON });
async function xN(t) {
  let e = new Nn(t),
    r = {},
    n = Jr(),
    i = new Dn(e, r, t, n),
    s = new lr(t.maskedProperties),
    o = JSON.parse((0, rv.readFileSync)((0, iv.join)(tv, 'run.json')).toString()),
    a = o.tasks.map((l) => ({
      ...l,
      terminalOutput: _o(tv, s, l.hash, l.cacheStatus, l.status),
    })),
    c = Ro();
  return (
    await i.endRun(
      o.run,
      a,
      { branch: null, runGroup: null, ciExecutionId: null, ciExecutionEnv: null },
      c,
    ),
    `${hs(t.url || 'https://nx.app')}/runs/${c}`
  );
}
async function ON() {
  let { nxJson: t, nxCloudOptions: e } = Ct();
  t.neverConnectToCloud && (Qb(), process.exit(1));
  let r = await xN(e);
  RN.success({
    title: 'Successfully uploaded the run details',
    bodyLines: [`View run details at ${r}`],
  }),
    (0, nv.default)(r);
}
var rv,
  nv,
  iv,
  RN,
  tv,
  Wf = q(() => {
    'use strict';
    (rv = require('fs')), (nv = br(Zb())), (iv = require('path'));
    ie();
    Hn();
    ev();
    Ya();
    qu();
    Bu();
    Nu();
    go();
    Pu();
    ({ output: RN } = Y()), ({ cacheDirectory: tv } = dt());
  });
exports.nxCloudTasksRunner = (...t) => (ab(), be(ob)).default(...t);
exports.configureLightClientRequire = () => (Sr(), be(rh)).configureLightClientRequire;
var TN = {
  'clean-up-agents': () => (Rf(), be(wf)).cleanUpAgents(),
  record: () => (Of(), be(xf)).runCommandAndStoreInCloud(),
  'start-agent': () => (kf(), be(Lf)).startAgent(),
  'start-ci-run': () => (Mf(), be(Ff)).startCiRun(),
  'stop-all-agents': () => (na(), be(ra)).stopAllAgents(),
  'complete-run-group': () => (na(), be(ra)).stopAllAgents(),
  'upload-and-show-run-details': () => (Wf(), be(Vf)).uploadAndShowRunDetails(),
};
exports.commands = TN;
exports.cleanUpAgents = () => (Rf(), be(wf)).cleanUpAgents();
exports.runCommandAndStoreInCloud = () => (Of(), be(xf)).runCommandAndStoreInCloud();
exports.startAgent = () => (kf(), be(Lf)).startAgent();
exports.startCiRun = () => (Mf(), be(Ff)).startCiRun();
exports.stopAllAgents = () => (na(), be(ra)).stopAllAgents();
exports.uploadAndShowRunDetails = () => (Wf(), be(Vf)).uploadAndShowRunDetails();
