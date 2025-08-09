import { jsx as st, Fragment as ho, jsxs as Li } from "react/jsx-runtime";
import * as cn from "react";
import { createContext as yt, useContext as F, useCallback as Te, useState as ce, useRef as Z, useEffect as mt, useId as hn, useInsertionEffect as wi, useMemo as gt, Children as fo, isValidElement as po, useLayoutEffect as mo, forwardRef as go, Fragment as Ii, createElement as yo, Component as So } from "react";
const P = (e) => typeof e == "string", Dt = () => {
  let e, t;
  const n = new Promise((s, i) => {
    e = s, t = i;
  });
  return n.resolve = e, n.reject = t, n;
}, qn = (e) => e == null ? "" : "" + e, vo = (e, t, n) => {
  e.forEach((s) => {
    t[s] && (n[s] = t[s]);
  });
}, Co = /###/g, Xn = (e) => e && e.indexOf("###") > -1 ? e.replace(Co, ".") : e, Jn = (e) => !e || P(e), kt = (e, t, n) => {
  const s = P(t) ? t.split(".") : t;
  let i = 0;
  for (; i < s.length - 1; ) {
    if (Jn(e)) return {};
    const r = Xn(s[i]);
    !e[r] && n && (e[r] = new n()), Object.prototype.hasOwnProperty.call(e, r) ? e = e[r] : e = {}, ++i;
  }
  return Jn(e) ? {} : {
    obj: e,
    k: Xn(s[i])
  };
}, Zn = (e, t, n) => {
  const {
    obj: s,
    k: i
  } = kt(e, t, Object);
  if (s !== void 0 || t.length === 1) {
    s[i] = n;
    return;
  }
  let r = t[t.length - 1], o = t.slice(0, t.length - 1), a = kt(e, o, Object);
  for (; a.obj === void 0 && o.length; )
    r = `${o[o.length - 1]}.${r}`, o = o.slice(0, o.length - 1), a = kt(e, o, Object), a != null && a.obj && typeof a.obj[`${a.k}.${r}`] < "u" && (a.obj = void 0);
  a.obj[`${a.k}.${r}`] = n;
}, To = (e, t, n, s) => {
  const {
    obj: i,
    k: r
  } = kt(e, t, Object);
  i[r] = i[r] || [], i[r].push(n);
}, he = (e, t) => {
  const {
    obj: n,
    k: s
  } = kt(e, t);
  if (n && Object.prototype.hasOwnProperty.call(n, s))
    return n[s];
}, Ao = (e, t, n) => {
  const s = he(e, n);
  return s !== void 0 ? s : he(t, n);
}, Ni = (e, t, n) => {
  for (const s in t)
    s !== "__proto__" && s !== "constructor" && (s in e ? P(e[s]) || e[s] instanceof String || P(t[s]) || t[s] instanceof String ? n && (e[s] = t[s]) : Ni(e[s], t[s], n) : e[s] = t[s]);
  return e;
}, Ct = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var xo = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const Eo = (e) => P(e) ? e.replace(/[&<>"'\/]/g, (t) => xo[t]) : e;
class Po {
  constructor(t) {
    this.capacity = t, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(t) {
    const n = this.regExpMap.get(t);
    if (n !== void 0)
      return n;
    const s = new RegExp(t);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(t, s), this.regExpQueue.push(t), s;
  }
}
const Ro = [" ", ",", "?", "!", ";"], Oo = new Po(20), bo = (e, t, n) => {
  t = t || "", n = n || "";
  const s = Ro.filter((o) => t.indexOf(o) < 0 && n.indexOf(o) < 0);
  if (s.length === 0) return !0;
  const i = Oo.getRegExp(`(${s.map((o) => o === "?" ? "\\?" : o).join("|")})`);
  let r = !i.test(e);
  if (!r) {
    const o = e.indexOf(n);
    o > 0 && !i.test(e.substring(0, o)) && (r = !0);
  }
  return r;
}, Ge = function(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e) return;
  if (e[t])
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
  const s = t.split(n);
  let i = e;
  for (let r = 0; r < s.length; ) {
    if (!i || typeof i != "object")
      return;
    let o, a = "";
    for (let l = r; l < s.length; ++l)
      if (l !== r && (a += n), a += s[l], o = i[a], o !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof o) > -1 && l < s.length - 1)
          continue;
        r += l - r + 1;
        break;
      }
    i = o;
  }
  return i;
}, fe = (e) => e == null ? void 0 : e.replace("_", "-"), Lo = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, t) {
    var n, s;
    (s = (n = console == null ? void 0 : console[e]) == null ? void 0 : n.apply) == null || s.call(n, console, t);
  }
};
class de {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || Lo, this.options = n, this.debug = n.debug;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.forward(n, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.forward(n, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.forward(n, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.forward(n, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, n, s, i) {
    return i && !this.debug ? null : (P(t[0]) && (t[0] = `${s}${this.prefix} ${t[0]}`), this.logger[n](t));
  }
  create(t) {
    return new de(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new de(this.logger, t);
  }
}
var J = new de();
class Ae {
  constructor() {
    this.observers = {};
  }
  on(t, n) {
    return t.split(" ").forEach((s) => {
      this.observers[s] || (this.observers[s] = /* @__PURE__ */ new Map());
      const i = this.observers[s].get(n) || 0;
      this.observers[s].set(n, i + 1);
    }), this;
  }
  off(t, n) {
    if (this.observers[t]) {
      if (!n) {
        delete this.observers[t];
        return;
      }
      this.observers[t].delete(n);
    }
  }
  emit(t) {
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      s[i - 1] = arguments[i];
    this.observers[t] && Array.from(this.observers[t].entries()).forEach((o) => {
      let [a, l] = o;
      for (let u = 0; u < l; u++)
        a(...s);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach((o) => {
      let [a, l] = o;
      for (let u = 0; u < l; u++)
        a.apply(a, [t, ...s]);
    });
  }
}
class Qn extends Ae {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const n = this.options.ns.indexOf(t);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(t, n, s) {
    var u, c;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const r = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, o = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a;
    t.indexOf(".") > -1 ? a = t.split(".") : (a = [t, n], s && (Array.isArray(s) ? a.push(...s) : P(s) && r ? a.push(...s.split(r)) : a.push(s)));
    const l = he(this.data, a);
    return !l && !n && !s && t.indexOf(".") > -1 && (t = a[0], n = a[1], s = a.slice(2).join(".")), l || !o || !P(s) ? l : Ge((c = (u = this.data) == null ? void 0 : u[t]) == null ? void 0 : c[n], s, r);
  }
  addResource(t, n, s, i) {
    let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const o = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let a = [t, n];
    s && (a = a.concat(o ? s.split(o) : s)), t.indexOf(".") > -1 && (a = t.split("."), i = n, n = a[1]), this.addNamespaces(n), Zn(this.data, a, i), r.silent || this.emit("added", t, n, s, i);
  }
  addResources(t, n, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const r in s)
      (P(s[r]) || Array.isArray(s[r])) && this.addResource(t, n, r, s[r], {
        silent: !0
      });
    i.silent || this.emit("added", t, n, s);
  }
  addResourceBundle(t, n, s, i, r) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1,
      skipCopy: !1
    }, a = [t, n];
    t.indexOf(".") > -1 && (a = t.split("."), i = s, s = n, n = a[1]), this.addNamespaces(n);
    let l = he(this.data, a) || {};
    o.skipCopy || (s = JSON.parse(JSON.stringify(s))), i ? Ni(l, s, r) : l = {
      ...l,
      ...s
    }, Zn(this.data, a, l), o.silent || this.emit("added", t, n, s);
  }
  removeResourceBundle(t, n) {
    this.hasResourceBundle(t, n) && delete this.data[t][n], this.removeNamespaces(n), this.emit("removed", t, n);
  }
  hasResourceBundle(t, n) {
    return this.getResource(t, n) !== void 0;
  }
  getResourceBundle(t, n) {
    return n || (n = this.options.defaultNS), this.getResource(t, n);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const n = this.getDataByLanguage(t);
    return !!(n && Object.keys(n) || []).find((i) => n[i] && Object.keys(n[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var Mi = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, s, i) {
    return e.forEach((r) => {
      var o;
      t = ((o = this.processors[r]) == null ? void 0 : o.process(t, n, s, i)) ?? t;
    }), t;
  }
};
const ts = {}, es = (e) => !P(e) && typeof e != "boolean" && typeof e != "number";
class pe extends Ae {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), vo(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = J.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (t == null)
      return !1;
    const s = this.resolve(t, n);
    return (s == null ? void 0 : s.res) !== void 0;
  }
  extractFromKey(t, n) {
    let s = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    s === void 0 && (s = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let r = n.ns || this.options.defaultNS || [];
    const o = s && t.indexOf(s) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !bo(t, s, i);
    if (o && !a) {
      const l = t.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: t,
          namespaces: P(r) ? [r] : r
        };
      const u = t.split(s);
      (s !== i || s === i && this.options.ns.indexOf(u[0]) > -1) && (r = u.shift()), t = u.join(i);
    }
    return {
      key: t,
      namespaces: P(r) ? [r] : r
    };
  }
  translate(t, n, s) {
    if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = {
      ...n
    }), n || (n = {}), t == null) return "";
    Array.isArray(t) || (t = [String(t)]);
    const i = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, r = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: a
    } = this.extractFromKey(t[t.length - 1], n), l = a[a.length - 1], u = n.lng || this.language, c = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((u == null ? void 0 : u.toLowerCase()) === "cimode") {
      if (c) {
        const L = n.nsSeparator || this.options.nsSeparator;
        return i ? {
          res: `${l}${L}${o}`,
          usedKey: o,
          exactUsedKey: o,
          usedLng: u,
          usedNS: l,
          usedParams: this.getUsedParamsDetails(n)
        } : `${l}${L}${o}`;
      }
      return i ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: u,
        usedNS: l,
        usedParams: this.getUsedParamsDetails(n)
      } : o;
    }
    const h = this.resolve(t, n);
    let f = h == null ? void 0 : h.res;
    const d = (h == null ? void 0 : h.usedKey) || o, p = (h == null ? void 0 : h.exactUsedKey) || o, m = ["[object Number]", "[object Function]", "[object RegExp]"], g = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, y = !this.i18nFormat || this.i18nFormat.handleAsObject, S = n.count !== void 0 && !P(n.count), v = pe.hasDefaultValue(n), E = S ? this.pluralResolver.getSuffix(u, n.count, n) : "", T = n.ordinal && S ? this.pluralResolver.getSuffix(u, n.count, {
      ordinal: !1
    }) : "", A = S && !n.ordinal && n.count === 0, R = A && n[`defaultValue${this.options.pluralSeparator}zero`] || n[`defaultValue${E}`] || n[`defaultValue${T}`] || n.defaultValue;
    let C = f;
    y && !f && v && (C = R);
    const O = es(C), b = Object.prototype.toString.apply(C);
    if (y && C && O && m.indexOf(b) < 0 && !(P(g) && Array.isArray(C))) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const L = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(d, C, {
          ...n,
          ns: a
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return i ? (h.res = L, h.usedParams = this.getUsedParamsDetails(n), h) : L;
      }
      if (r) {
        const L = Array.isArray(C), j = L ? [] : {}, ee = L ? p : d;
        for (const K in C)
          if (Object.prototype.hasOwnProperty.call(C, K)) {
            const X = `${ee}${r}${K}`;
            v && !f ? j[K] = this.translate(X, {
              ...n,
              defaultValue: es(R) ? R[K] : void 0,
              joinArrays: !1,
              ns: a
            }) : j[K] = this.translate(X, {
              ...n,
              joinArrays: !1,
              ns: a
            }), j[K] === X && (j[K] = C[K]);
          }
        f = j;
      }
    } else if (y && P(g) && Array.isArray(f))
      f = f.join(g), f && (f = this.extendTranslation(f, t, n, s));
    else {
      let L = !1, j = !1;
      !this.isValidLookup(f) && v && (L = !0, f = R), this.isValidLookup(f) || (j = !0, f = o);
      const K = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && j ? void 0 : f, X = v && R !== f && this.options.updateMissing;
      if (j || L || X) {
        if (this.logger.log(X ? "updateKey" : "missingKey", u, l, o, X ? R : f), r) {
          const V = this.resolve(o, {
            ...n,
            keySeparator: !1
          });
          V && V.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let vt = [];
        const D = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && D && D[0])
          for (let V = 0; V < D.length; V++)
            vt.push(D[V]);
        else this.options.saveMissingTo === "all" ? vt = this.languageUtils.toResolveHierarchy(n.lng || this.language) : vt.push(n.lng || this.language);
        const H = (V, Y, Mt) => {
          var Yn;
          const zn = v && Mt !== f ? Mt : K;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(V, l, Y, zn, X, n) : (Yn = this.backendConnector) != null && Yn.saveMissing && this.backendConnector.saveMissing(V, l, Y, zn, X, n), this.emit("missingKey", V, l, Y, f);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && S ? vt.forEach((V) => {
          const Y = this.pluralResolver.getSuffixes(V, n);
          A && n[`defaultValue${this.options.pluralSeparator}zero`] && Y.indexOf(`${this.options.pluralSeparator}zero`) < 0 && Y.push(`${this.options.pluralSeparator}zero`), Y.forEach((Mt) => {
            H([V], o + Mt, n[`defaultValue${Mt}`] || R);
          });
        }) : H(vt, o, R));
      }
      f = this.extendTranslation(f, t, n, h, s), j && f === o && this.options.appendNamespaceToMissingKey && (f = `${l}:${o}`), (j || L) && this.options.parseMissingKeyHandler && (f = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}:${o}` : o, L ? f : void 0));
    }
    return i ? (h.res = f, h.usedParams = this.getUsedParamsDetails(n), h) : f;
  }
  extendTranslation(t, n, s, i, r) {
    var u, c;
    var o = this;
    if ((u = this.i18nFormat) != null && u.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...s
      }, s.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!s.skipInterpolation) {
      s.interpolation && this.interpolator.init({
        ...s,
        interpolation: {
          ...this.options.interpolation,
          ...s.interpolation
        }
      });
      const h = P(t) && (((c = s == null ? void 0 : s.interpolation) == null ? void 0 : c.skipOnVariables) !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let f;
      if (h) {
        const p = t.match(this.interpolator.nestingRegexp);
        f = p && p.length;
      }
      let d = s.replace && !P(s.replace) ? s.replace : s;
      if (this.options.interpolation.defaultVariables && (d = {
        ...this.options.interpolation.defaultVariables,
        ...d
      }), t = this.interpolator.interpolate(t, d, s.lng || this.language || i.usedLng, s), h) {
        const p = t.match(this.interpolator.nestingRegexp), m = p && p.length;
        f < m && (s.nest = !1);
      }
      !s.lng && i && i.res && (s.lng = this.language || i.usedLng), s.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var p = arguments.length, m = new Array(p), g = 0; g < p; g++)
          m[g] = arguments[g];
        return (r == null ? void 0 : r[0]) === m[0] && !s.context ? (o.logger.warn(`It seems you are nesting recursively key: ${m[0]} in key: ${n[0]}`), null) : o.translate(...m, n);
      }, s)), s.interpolation && this.interpolator.reset();
    }
    const a = s.postProcess || this.options.postProcess, l = P(a) ? [a] : a;
    return t != null && (l != null && l.length) && s.applyPostProcessor !== !1 && (t = Mi.handle(l, t, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(s)
      },
      ...s
    } : s, this)), t;
  }
  resolve(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s, i, r, o, a;
    return P(t) && (t = [t]), t.forEach((l) => {
      if (this.isValidLookup(s)) return;
      const u = this.extractFromKey(l, n), c = u.key;
      i = c;
      let h = u.namespaces;
      this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
      const f = n.count !== void 0 && !P(n.count), d = f && !n.ordinal && n.count === 0, p = n.context !== void 0 && (P(n.context) || typeof n.context == "number") && n.context !== "", m = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      h.forEach((g) => {
        var y, S;
        this.isValidLookup(s) || (a = g, !ts[`${m[0]}-${g}`] && ((y = this.utils) != null && y.hasLoadedNamespace) && !((S = this.utils) != null && S.hasLoadedNamespace(a)) && (ts[`${m[0]}-${g}`] = !0, this.logger.warn(`key "${i}" for languages "${m.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), m.forEach((v) => {
          var A;
          if (this.isValidLookup(s)) return;
          o = v;
          const E = [c];
          if ((A = this.i18nFormat) != null && A.addLookupKeys)
            this.i18nFormat.addLookupKeys(E, c, v, g, n);
          else {
            let R;
            f && (R = this.pluralResolver.getSuffix(v, n.count, n));
            const C = `${this.options.pluralSeparator}zero`, O = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (f && (E.push(c + R), n.ordinal && R.indexOf(O) === 0 && E.push(c + R.replace(O, this.options.pluralSeparator)), d && E.push(c + C)), p) {
              const b = `${c}${this.options.contextSeparator}${n.context}`;
              E.push(b), f && (E.push(b + R), n.ordinal && R.indexOf(O) === 0 && E.push(b + R.replace(O, this.options.pluralSeparator)), d && E.push(b + C));
            }
          }
          let T;
          for (; T = E.pop(); )
            this.isValidLookup(s) || (r = T, s = this.getResource(v, g, T, n));
        }));
      });
    }), {
      res: s,
      usedKey: i,
      exactUsedKey: r,
      usedLng: o,
      usedNS: a
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, n, s) {
    var r;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return (r = this.i18nFormat) != null && r.getResource ? this.i18nFormat.getResource(t, n, s, i) : this.resourceStore.getResource(t, n, s, i);
  }
  getUsedParamsDetails() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], s = t.replace && !P(t.replace);
    let i = s ? t.replace : t;
    if (s && typeof t.count < "u" && (i.count = t.count), this.options.interpolation.defaultVariables && (i = {
      ...this.options.interpolation.defaultVariables,
      ...i
    }), !s) {
      i = {
        ...i
      };
      for (const r of n)
        delete i[r];
    }
    return i;
  }
  static hasDefaultValue(t) {
    const n = "defaultValue";
    for (const s in t)
      if (Object.prototype.hasOwnProperty.call(t, s) && n === s.substring(0, n.length) && t[s] !== void 0)
        return !0;
    return !1;
  }
}
class ns {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = J.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = fe(t), !t || t.indexOf("-") < 0) return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = fe(t), !t || t.indexOf("-") < 0) return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (P(t) && t.indexOf("-") > -1) {
      let n;
      try {
        n = Intl.getCanonicalLocales(t)[0];
      } catch {
      }
      return n && this.options.lowerCaseLng && (n = n.toLowerCase()), n || (this.options.lowerCaseLng ? t.toLowerCase() : t);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t) return null;
    let n;
    return t.forEach((s) => {
      if (n) return;
      const i = this.formatLanguageCode(s);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (n = i);
    }), !n && this.options.supportedLngs && t.forEach((s) => {
      if (n) return;
      const i = this.getLanguagePartFromCode(s);
      if (this.isSupportedCode(i)) return n = i;
      n = this.options.supportedLngs.find((r) => {
        if (r === i) return r;
        if (!(r.indexOf("-") < 0 && i.indexOf("-") < 0) && (r.indexOf("-") > 0 && i.indexOf("-") < 0 && r.substring(0, r.indexOf("-")) === i || r.indexOf(i) === 0 && i.length > 1))
          return r;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(t, n) {
    if (!t) return [];
    if (typeof t == "function" && (t = t(n)), P(t) && (t = [t]), Array.isArray(t)) return t;
    if (!n) return t.default || [];
    let s = t[n];
    return s || (s = t[this.getScriptPartFromCode(n)]), s || (s = t[this.formatLanguageCode(n)]), s || (s = t[this.getLanguagePartFromCode(n)]), s || (s = t.default), s || [];
  }
  toResolveHierarchy(t, n) {
    const s = this.getFallbackCodes(n || this.options.fallbackLng || [], t), i = [], r = (o) => {
      o && (this.isSupportedCode(o) ? i.push(o) : this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`));
    };
    return P(t) && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(t))) : P(t) && r(this.formatLanguageCode(t)), s.forEach((o) => {
      i.indexOf(o) < 0 && r(this.formatLanguageCode(o));
    }), i;
  }
}
const ss = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, is = {
  select: (e) => e === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class wo {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = J.create("pluralResolver"), this.pluralRulesCache = {};
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = fe(t === "dev" ? "en" : t), i = n.ordinal ? "ordinal" : "cardinal", r = JSON.stringify({
      cleanedCode: s,
      type: i
    });
    if (r in this.pluralRulesCache)
      return this.pluralRulesCache[r];
    let o;
    try {
      o = new Intl.PluralRules(s, {
        type: i
      });
    } catch {
      if (!Intl)
        return this.logger.error("No Intl support, please use an Intl polyfill!"), is;
      if (!t.match(/-|_/)) return is;
      const l = this.languageUtils.getLanguagePartFromCode(t);
      o = this.getRule(l, n);
    }
    return this.pluralRulesCache[r] = o, o;
  }
  needsPlural(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = this.getRule(t, n);
    return s || (s = this.getRule("dev", n)), (s == null ? void 0 : s.resolvedOptions().pluralCategories.length) > 1;
  }
  getPluralFormsOfKey(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, s).map((i) => `${n}${i}`);
  }
  getSuffixes(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = this.getRule(t, n);
    return s || (s = this.getRule("dev", n)), s ? s.resolvedOptions().pluralCategories.sort((i, r) => ss[i] - ss[r]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = this.getRule(t, s);
    return i ? `${this.options.prepend}${s.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${t}`), this.getSuffix("dev", n, s));
  }
}
const rs = function(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, r = Ao(e, t, n);
  return !r && i && P(n) && (r = Ge(e, n, s), r === void 0 && (r = Ge(t, n, s))), r;
}, Le = (e) => e.replace(/\$/g, "$$$$");
class Io {
  constructor() {
    var n;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = J.create("interpolator"), this.options = t, this.format = ((n = t == null ? void 0 : t.interpolation) == null ? void 0 : n.format) || ((s) => s), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const {
      escape: n,
      escapeValue: s,
      useRawValueToEscape: i,
      prefix: r,
      prefixEscaped: o,
      suffix: a,
      suffixEscaped: l,
      formatSeparator: u,
      unescapeSuffix: c,
      unescapePrefix: h,
      nestingPrefix: f,
      nestingPrefixEscaped: d,
      nestingSuffix: p,
      nestingSuffixEscaped: m,
      nestingOptionsSeparator: g,
      maxReplaces: y,
      alwaysFormat: S
    } = t.interpolation;
    this.escape = n !== void 0 ? n : Eo, this.escapeValue = s !== void 0 ? s : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = r ? Ct(r) : o || "{{", this.suffix = a ? Ct(a) : l || "}}", this.formatSeparator = u || ",", this.unescapePrefix = c ? "" : h || "-", this.unescapeSuffix = this.unescapePrefix ? "" : c || "", this.nestingPrefix = f ? Ct(f) : d || Ct("$t("), this.nestingSuffix = p ? Ct(p) : m || Ct(")"), this.nestingOptionsSeparator = g || ",", this.maxReplaces = y || 1e3, this.alwaysFormat = S !== void 0 ? S : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (n, s) => (n == null ? void 0 : n.source) === s ? (n.lastIndex = 0, n) : new RegExp(s, "g");
    this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = t(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = t(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(t, n, s, i) {
    var d;
    let r, o, a;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, u = (p) => {
      if (p.indexOf(this.formatSeparator) < 0) {
        const S = rs(n, l, p, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(S, void 0, s, {
          ...i,
          ...n,
          interpolationkey: p
        }) : S;
      }
      const m = p.split(this.formatSeparator), g = m.shift().trim(), y = m.join(this.formatSeparator).trim();
      return this.format(rs(n, l, g, this.options.keySeparator, this.options.ignoreJSONStructure), y, s, {
        ...i,
        ...n,
        interpolationkey: g
      });
    };
    this.resetRegExp();
    const c = (i == null ? void 0 : i.missingInterpolationHandler) || this.options.missingInterpolationHandler, h = ((d = i == null ? void 0 : i.interpolation) == null ? void 0 : d.skipOnVariables) !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (p) => Le(p)
    }, {
      regex: this.regexp,
      safeValue: (p) => this.escapeValue ? Le(this.escape(p)) : Le(p)
    }].forEach((p) => {
      for (a = 0; r = p.regex.exec(t); ) {
        const m = r[1].trim();
        if (o = u(m), o === void 0)
          if (typeof c == "function") {
            const y = c(t, r, i);
            o = P(y) ? y : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, m))
            o = "";
          else if (h) {
            o = r[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${m} for interpolating ${t}`), o = "";
        else !P(o) && !this.useRawValueToEscape && (o = qn(o));
        const g = p.safeValue(o);
        if (t = t.replace(r[0], g), h ? (p.regex.lastIndex += o.length, p.regex.lastIndex -= r[0].length) : p.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i, r, o;
    const a = (l, u) => {
      const c = this.nestingOptionsSeparator;
      if (l.indexOf(c) < 0) return l;
      const h = l.split(new RegExp(`${c}[ ]*{`));
      let f = `{${h[1]}`;
      l = h[0], f = this.interpolate(f, o);
      const d = f.match(/'/g), p = f.match(/"/g);
      (((d == null ? void 0 : d.length) ?? 0) % 2 === 0 && !p || p.length % 2 !== 0) && (f = f.replace(/'/g, '"'));
      try {
        o = JSON.parse(f), u && (o = {
          ...u,
          ...o
        });
      } catch (m) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, m), `${l}${c}${f}`;
      }
      return o.defaultValue && o.defaultValue.indexOf(this.prefix) > -1 && delete o.defaultValue, l;
    };
    for (; i = this.nestingRegexp.exec(t); ) {
      let l = [];
      o = {
        ...s
      }, o = o.replace && !P(o.replace) ? o.replace : o, o.applyPostProcessor = !1, delete o.defaultValue;
      let u = !1;
      if (i[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(i[1])) {
        const c = i[1].split(this.formatSeparator).map((h) => h.trim());
        i[1] = c.shift(), l = c, u = !0;
      }
      if (r = n(a.call(this, i[1].trim(), o), o), r && i[0] === t && !P(r)) return r;
      P(r) || (r = qn(r)), r || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${t}`), r = ""), u && (r = l.reduce((c, h) => this.format(c, h, s.lng, {
        ...s,
        interpolationkey: i[1].trim()
      }), r.trim())), t = t.replace(i[0], r), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
const No = (e) => {
  let t = e.toLowerCase().trim();
  const n = {};
  if (e.indexOf("(") > -1) {
    const s = e.split("(");
    t = s[0].toLowerCase().trim();
    const i = s[1].substring(0, s[1].length - 1);
    t === "currency" && i.indexOf(":") < 0 ? n.currency || (n.currency = i.trim()) : t === "relativetime" && i.indexOf(":") < 0 ? n.range || (n.range = i.trim()) : i.split(";").forEach((o) => {
      if (o) {
        const [a, ...l] = o.split(":"), u = l.join(":").trim().replace(/^'+|'+$/g, ""), c = a.trim();
        n[c] || (n[c] = u), u === "false" && (n[c] = !1), u === "true" && (n[c] = !0), isNaN(u) || (n[c] = parseInt(u, 10));
      }
    });
  }
  return {
    formatName: t,
    formatOptions: n
  };
}, Tt = (e) => {
  const t = {};
  return (n, s, i) => {
    let r = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (r = {
      ...r,
      [i.interpolationkey]: void 0
    });
    const o = s + JSON.stringify(r);
    let a = t[o];
    return a || (a = e(fe(s), i), t[o] = a), a(n);
  };
};
class Mo {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = J.create("formatter"), this.options = t, this.formats = {
      number: Tt((n, s) => {
        const i = new Intl.NumberFormat(n, {
          ...s
        });
        return (r) => i.format(r);
      }),
      currency: Tt((n, s) => {
        const i = new Intl.NumberFormat(n, {
          ...s,
          style: "currency"
        });
        return (r) => i.format(r);
      }),
      datetime: Tt((n, s) => {
        const i = new Intl.DateTimeFormat(n, {
          ...s
        });
        return (r) => i.format(r);
      }),
      relativetime: Tt((n, s) => {
        const i = new Intl.RelativeTimeFormat(n, {
          ...s
        });
        return (r) => i.format(r, s.range || "day");
      }),
      list: Tt((n, s) => {
        const i = new Intl.ListFormat(n, {
          ...s
        });
        return (r) => i.format(r);
      })
    }, this.init(t);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    this.formatSeparator = n.interpolation.formatSeparator || ",";
  }
  add(t, n) {
    this.formats[t.toLowerCase().trim()] = n;
  }
  addCached(t, n) {
    this.formats[t.toLowerCase().trim()] = Tt(n);
  }
  format(t, n, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const r = n.split(this.formatSeparator);
    if (r.length > 1 && r[0].indexOf("(") > 1 && r[0].indexOf(")") < 0 && r.find((a) => a.indexOf(")") > -1)) {
      const a = r.findIndex((l) => l.indexOf(")") > -1);
      r[0] = [r[0], ...r.splice(1, a)].join(this.formatSeparator);
    }
    return r.reduce((a, l) => {
      var h;
      const {
        formatName: u,
        formatOptions: c
      } = No(l);
      if (this.formats[u]) {
        let f = a;
        try {
          const d = ((h = i == null ? void 0 : i.formatParams) == null ? void 0 : h[i.interpolationkey]) || {}, p = d.locale || d.lng || i.locale || i.lng || s;
          f = this.formats[u](a, p, {
            ...c,
            ...i,
            ...d
          });
        } catch (d) {
          this.logger.warn(d);
        }
        return f;
      } else
        this.logger.warn(`there was no format function for ${u}`);
      return a;
    }, t);
  }
}
const Do = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class Vo extends Ae {
  constructor(t, n, s) {
    var r, o;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = s, this.languageUtils = s.languageUtils, this.options = i, this.logger = J.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (o = (r = this.backend) == null ? void 0 : r.init) == null || o.call(r, s, i.backend, i);
  }
  queueLoad(t, n, s, i) {
    const r = {}, o = {}, a = {}, l = {};
    return t.forEach((u) => {
      let c = !0;
      n.forEach((h) => {
        const f = `${u}|${h}`;
        !s.reload && this.store.hasResourceBundle(u, h) ? this.state[f] = 2 : this.state[f] < 0 || (this.state[f] === 1 ? o[f] === void 0 && (o[f] = !0) : (this.state[f] = 1, c = !1, o[f] === void 0 && (o[f] = !0), r[f] === void 0 && (r[f] = !0), l[h] === void 0 && (l[h] = !0)));
      }), c || (a[u] = !0);
    }), (Object.keys(r).length || Object.keys(o).length) && this.queue.push({
      pending: o,
      pendingCount: Object.keys(o).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(r),
      pending: Object.keys(o),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(t, n, s) {
    const i = t.split("|"), r = i[0], o = i[1];
    n && this.emit("failedLoading", r, o, n), !n && s && this.store.addResourceBundle(r, o, s, void 0, void 0, {
      skipCopy: !0
    }), this.state[t] = n ? -1 : 2, n && s && (this.state[t] = 0);
    const a = {};
    this.queue.forEach((l) => {
      To(l.loaded, [r], o), Do(l, t), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((u) => {
        a[u] || (a[u] = {});
        const c = l.loaded[u];
        c.length && c.forEach((h) => {
          a[u][h] === void 0 && (a[u][h] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((l) => !l.done);
  }
  read(t, n, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, o = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length) return o(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: s,
        tried: i,
        wait: r,
        callback: o
      });
      return;
    }
    this.readingCalls++;
    const a = (u, c) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const h = this.waitingReads.shift();
        this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback);
      }
      if (u && c && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, n, s, i + 1, r * 2, o);
        }, r);
        return;
      }
      o(u, c);
    }, l = this.backend[s].bind(this.backend);
    if (l.length === 2) {
      try {
        const u = l(t, n);
        u && typeof u.then == "function" ? u.then((c) => a(null, c)).catch(a) : a(null, u);
      } catch (u) {
        a(u);
      }
      return;
    }
    return l(t, n, a);
  }
  prepareLoading(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    P(t) && (t = this.languageUtils.toResolveHierarchy(t)), P(n) && (n = [n]);
    const r = this.queueLoad(t, n, s, i);
    if (!r.toLoad.length)
      return r.pending.length || i(), null;
    r.toLoad.forEach((o) => {
      this.loadOne(o);
    });
  }
  load(t, n, s) {
    this.prepareLoading(t, n, {}, s);
  }
  reload(t, n, s) {
    this.prepareLoading(t, n, {
      reload: !0
    }, s);
  }
  loadOne(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = t.split("|"), i = s[0], r = s[1];
    this.read(i, r, "read", void 0, void 0, (o, a) => {
      o && this.logger.warn(`${n}loading namespace ${r} for language ${i} failed`, o), !o && a && this.logger.log(`${n}loaded namespace ${r} for language ${i}`, a), this.loaded(t, o, a);
    });
  }
  saveMissing(t, n, s, i, r) {
    var l, u, c, h, f;
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if ((u = (l = this.services) == null ? void 0 : l.utils) != null && u.hasLoadedNamespace && !((h = (c = this.services) == null ? void 0 : c.utils) != null && h.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${s}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(s == null || s === "")) {
      if ((f = this.backend) != null && f.create) {
        const d = {
          ...o,
          isUpdate: r
        }, p = this.backend.create.bind(this.backend);
        if (p.length < 6)
          try {
            let m;
            p.length === 5 ? m = p(t, n, s, i, d) : m = p(t, n, s, i), m && typeof m.then == "function" ? m.then((g) => a(null, g)).catch(a) : a(null, m);
          } catch (m) {
            a(m);
          }
        else
          p(t, n, s, i, a, d);
      }
      !t || !t[0] || this.store.addResource(t[0], n, s, i);
    }
  }
}
const os = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  simplifyPluralSuffix: !0,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (e) => {
    let t = {};
    if (typeof e[1] == "object" && (t = e[1]), P(e[1]) && (t.defaultValue = e[1]), P(e[2]) && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
      const n = e[3] || e[2];
      Object.keys(n).forEach((s) => {
        t[s] = n[s];
      });
    }
    return t;
  },
  interpolation: {
    escapeValue: !0,
    format: (e) => e,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  }
}), as = (e) => {
  var t, n;
  return P(e.ns) && (e.ns = [e.ns]), P(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), P(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), ((n = (t = e.supportedLngs) == null ? void 0 : t.indexOf) == null ? void 0 : n.call(t, "cimode")) < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), typeof e.initImmediate == "boolean" && (e.initAsync = e.initImmediate), e;
}, ne = () => {
}, _o = (e) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
};
class Gt extends Ae {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = as(t), this.services = {}, this.logger = J, this.modules = {
      external: []
    }, _o(this), n && !this.isInitialized && !t.isClone) {
      if (!this.options.initAsync)
        return this.init(t, n), this;
      setTimeout(() => {
        this.init(t, n);
      }, 0);
    }
  }
  init() {
    var t = this;
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 ? arguments[1] : void 0;
    this.isInitializing = !0, typeof n == "function" && (s = n, n = {}), n.defaultNS == null && n.ns && (P(n.ns) ? n.defaultNS = n.ns : n.ns.indexOf("translation") < 0 && (n.defaultNS = n.ns[0]));
    const i = os();
    this.options = {
      ...i,
      ...this.options,
      ...as(n)
    }, this.options.interpolation = {
      ...i.interpolation,
      ...this.options.interpolation
    }, n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
    const r = (c) => c ? typeof c == "function" ? new c() : c : null;
    if (!this.options.isClone) {
      this.modules.logger ? J.init(r(this.modules.logger), this.options) : J.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : c = Mo;
      const h = new ns(this.options);
      this.store = new Qn(this.options.resources, this.options);
      const f = this.services;
      f.logger = J, f.resourceStore = this.store, f.languageUtils = h, f.pluralResolver = new wo(h, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), c && (!this.options.interpolation.format || this.options.interpolation.format === i.interpolation.format) && (f.formatter = r(c), f.formatter.init(f, this.options), this.options.interpolation.format = f.formatter.format.bind(f.formatter)), f.interpolator = new Io(this.options), f.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, f.backendConnector = new Vo(r(this.modules.backend), f.resourceStore, f, this.options), f.backendConnector.on("*", function(d) {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), g = 1; g < p; g++)
          m[g - 1] = arguments[g];
        t.emit(d, ...m);
      }), this.modules.languageDetector && (f.languageDetector = r(this.modules.languageDetector), f.languageDetector.init && f.languageDetector.init(f, this.options.detection, this.options)), this.modules.i18nFormat && (f.i18nFormat = r(this.modules.i18nFormat), f.i18nFormat.init && f.i18nFormat.init(this)), this.translator = new pe(this.services, this.options), this.translator.on("*", function(d) {
        for (var p = arguments.length, m = new Array(p > 1 ? p - 1 : 0), g = 1; g < p; g++)
          m[g - 1] = arguments[g];
        t.emit(d, ...m);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, s || (s = ne), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const c = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      c.length > 0 && c[0] !== "dev" && (this.options.lng = c[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((c) => {
      this[c] = function() {
        return t.store[c](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((c) => {
      this[c] = function() {
        return t.store[c](...arguments), t;
      };
    });
    const l = Dt(), u = () => {
      const c = (h, f) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), l.resolve(f), s(h, f);
      };
      if (this.languages && !this.isInitialized) return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initAsync ? u() : setTimeout(u, 0), l;
  }
  loadResources(t) {
    var r, o;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ne;
    const i = P(t) ? t : this.language;
    if (typeof t == "function" && (s = t), !this.options.resources || this.options.partialBundledLanguages) {
      if ((i == null ? void 0 : i.toLowerCase()) === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return s();
      const a = [], l = (u) => {
        if (!u || u === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(u).forEach((h) => {
          h !== "cimode" && a.indexOf(h) < 0 && a.push(h);
        });
      };
      i ? l(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((c) => l(c)), (o = (r = this.options.preload) == null ? void 0 : r.forEach) == null || o.call(r, (u) => l(u)), this.services.backendConnector.load(a, this.options.ns, (u) => {
        !u && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), s(u);
      });
    } else
      s(null);
  }
  reloadResources(t, n, s) {
    const i = Dt();
    return typeof t == "function" && (s = t, t = void 0), typeof n == "function" && (s = n, n = void 0), t || (t = this.languages), n || (n = this.options.ns), s || (s = ne), this.services.backendConnector.reload(t, n, (r) => {
      i.resolve(), s(r);
    }), i;
  }
  use(t) {
    if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Mi.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let n = 0; n < this.languages.length; n++) {
        const s = this.languages[n];
        if (!(["cimode", "dev"].indexOf(s) > -1) && this.store.hasLanguageSomeTranslations(s)) {
          this.resolvedLanguage = s;
          break;
        }
      }
  }
  changeLanguage(t, n) {
    var s = this;
    this.isLanguageChangingTo = t;
    const i = Dt();
    this.emit("languageChanging", t);
    const r = (l) => {
      this.language = l, this.languages = this.services.languageUtils.toResolveHierarchy(l), this.resolvedLanguage = void 0, this.setResolvedLanguage(l);
    }, o = (l, u) => {
      u ? (r(u), this.translator.changeLanguage(u), this.isLanguageChangingTo = void 0, this.emit("languageChanged", u), this.logger.log("languageChanged", u)) : this.isLanguageChangingTo = void 0, i.resolve(function() {
        return s.t(...arguments);
      }), n && n(l, function() {
        return s.t(...arguments);
      });
    }, a = (l) => {
      var c, h;
      !t && !l && this.services.languageDetector && (l = []);
      const u = P(l) ? l : this.services.languageUtils.getBestMatchFromCodes(l);
      u && (this.language || r(u), this.translator.language || this.translator.changeLanguage(u), (h = (c = this.services.languageDetector) == null ? void 0 : c.cacheUserLanguage) == null || h.call(c, u)), this.loadResources(u, (f) => {
        o(f, u);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? a(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(a) : this.services.languageDetector.detect(a) : a(t), i;
  }
  getFixedT(t, n, s) {
    var i = this;
    const r = function(o, a) {
      let l;
      if (typeof a != "object") {
        for (var u = arguments.length, c = new Array(u > 2 ? u - 2 : 0), h = 2; h < u; h++)
          c[h - 2] = arguments[h];
        l = i.options.overloadTranslationOptionHandler([o, a].concat(c));
      } else
        l = {
          ...a
        };
      l.lng = l.lng || r.lng, l.lngs = l.lngs || r.lngs, l.ns = l.ns || r.ns, l.keyPrefix !== "" && (l.keyPrefix = l.keyPrefix || s || r.keyPrefix);
      const f = i.options.keySeparator || ".";
      let d;
      return l.keyPrefix && Array.isArray(o) ? d = o.map((p) => `${l.keyPrefix}${f}${p}`) : d = l.keyPrefix ? `${l.keyPrefix}${f}${o}` : o, i.t(d, l);
    };
    return P(t) ? r.lng = t : r.lngs = t, r.ns = n, r.keyPrefix = s, r;
  }
  t() {
    var i;
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return (i = this.translator) == null ? void 0 : i.translate(...n);
  }
  exists() {
    var i;
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return (i = this.translator) == null ? void 0 : i.exists(...n);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const s = n.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, r = this.languages[this.languages.length - 1];
    if (s.toLowerCase() === "cimode") return !0;
    const o = (a, l) => {
      const u = this.services.backendConnector.state[`${a}|${l}`];
      return u === -1 || u === 0 || u === 2;
    };
    if (n.precheck) {
      const a = n.precheck(this, o);
      if (a !== void 0) return a;
    }
    return !!(this.hasResourceBundle(s, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || o(s, t) && (!i || o(r, t)));
  }
  loadNamespaces(t, n) {
    const s = Dt();
    return this.options.ns ? (P(t) && (t = [t]), t.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      s.resolve(), n && n(i);
    }), s) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const s = Dt();
    P(t) && (t = [t]);
    const i = this.options.preload || [], r = t.filter((o) => i.indexOf(o) < 0 && this.services.languageUtils.isSupportedCode(o));
    return r.length ? (this.options.preload = i.concat(r), this.loadResources((o) => {
      s.resolve(), n && n(o);
    }), s) : (n && n(), Promise.resolve());
  }
  dir(t) {
    var i, r;
    if (t || (t = this.resolvedLanguage || (((i = this.languages) == null ? void 0 : i.length) > 0 ? this.languages[0] : this.language)), !t) return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], s = ((r = this.services) == null ? void 0 : r.languageUtils) || new ns(os());
    return n.indexOf(s.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new Gt(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ne;
    const s = t.forkResourceStore;
    s && delete t.forkResourceStore;
    const i = {
      ...this.options,
      ...t,
      isClone: !0
    }, r = new Gt(i);
    if ((t.debug !== void 0 || t.prefix !== void 0) && (r.logger = r.logger.clone(t)), ["store", "services", "language"].forEach((a) => {
      r[a] = this[a];
    }), r.services = {
      ...this.services
    }, r.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, s) {
      const a = Object.keys(this.store.data).reduce((l, u) => (l[u] = {
        ...this.store.data[u]
      }, Object.keys(l[u]).reduce((c, h) => (c[h] = {
        ...l[u][h]
      }, c), {})), {});
      r.store = new Qn(a, i), r.services.resourceStore = r.store;
    }
    return r.translator = new pe(r.services, i), r.translator.on("*", function(a) {
      for (var l = arguments.length, u = new Array(l > 1 ? l - 1 : 0), c = 1; c < l; c++)
        u[c - 1] = arguments[c];
      r.emit(a, ...u);
    }), r.init(i, n), r.translator.options = i, r.translator.backendConnector.services.utils = {
      hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
    }, r;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const B = Gt.createInstance();
B.createInstance = Gt.createInstance;
B.createInstance;
B.dir;
B.init;
B.loadResources;
B.reloadResources;
B.use;
B.changeLanguage;
B.getFixedT;
B.t;
B.exists;
B.setDefaultNamespace;
B.hasLoadedNamespace;
B.loadNamespaces;
B.loadLanguages;
const Fo = (e, t, n, s) => {
  var r, o, a, l;
  const i = [n, {
    code: t,
    ...s || {}
  }];
  if ((o = (r = e == null ? void 0 : e.services) == null ? void 0 : r.logger) != null && o.forward)
    return e.services.logger.forward(i, "warn", "react-i18next::", !0);
  dt(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (a = e == null ? void 0 : e.services) == null ? void 0 : a.logger) != null && l.warn ? e.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, ls = {}, Ke = (e, t, n, s) => {
  dt(n) && ls[n] || (dt(n) && (ls[n] = /* @__PURE__ */ new Date()), Fo(e, t, n, s));
}, Di = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const n = () => {
      setTimeout(() => {
        e.off("initialized", n);
      }, 0), t();
    };
    e.on("initialized", n);
  }
}, He = (e, t, n) => {
  e.loadNamespaces(t, Di(e, n));
}, us = (e, t, n, s) => {
  if (dt(n) && (n = [n]), e.options.preload && e.options.preload.indexOf(t) > -1) return He(e, n, s);
  n.forEach((i) => {
    e.options.ns.indexOf(i) < 0 && e.options.ns.push(i);
  }), e.loadLanguages(t, Di(e, s));
}, ko = (e, t, n = {}) => !t.languages || !t.languages.length ? (Ke(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: t.languages
}), !0) : t.hasLoadedNamespace(e, {
  lng: n.lng,
  precheck: (s, i) => {
    var r;
    if (((r = n.bindI18n) == null ? void 0 : r.indexOf("languageChanging")) > -1 && s.services.backendConnector.backend && s.isLanguageChangingTo && !i(s.isLanguageChangingTo, e)) return !1;
  }
}), dt = (e) => typeof e == "string", $o = (e) => typeof e == "object" && e !== null, Bo = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Uo = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, jo = (e) => Uo[e], Go = (e) => e.replace(Bo, jo);
let We = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Go
};
const Ko = (e = {}) => {
  We = {
    ...We,
    ...e
  };
}, Ho = () => We;
let Vi;
const Wo = (e) => {
  Vi = e;
}, zo = () => Vi, Yo = {
  type: "3rdParty",
  init(e) {
    Ko(e.options.react), Wo(e);
  }
}, qo = yt();
class Xo {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const Jo = (e, t) => {
  const n = Z();
  return mt(() => {
    n.current = e;
  }, [e, t]), n.current;
}, _i = (e, t, n, s) => e.getFixedT(t, n, s), Zo = (e, t, n, s) => Te(_i(e, t, n, s), [e, t, n, s]), Qo = (e, t = {}) => {
  var E, T, A, R;
  const {
    i18n: n
  } = t, {
    i18n: s,
    defaultNS: i
  } = F(qo) || {}, r = n || s || zo();
  if (r && !r.reportNamespaces && (r.reportNamespaces = new Xo()), !r) {
    Ke(r, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const C = (b, L) => dt(L) ? L : $o(L) && dt(L.defaultValue) ? L.defaultValue : Array.isArray(b) ? b[b.length - 1] : b, O = [C, {}, !1];
    return O.t = C, O.i18n = {}, O.ready = !1, O;
  }
  (E = r.options.react) != null && E.wait && Ke(r, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const o = {
    ...Ho(),
    ...r.options.react,
    ...t
  }, {
    useSuspense: a,
    keyPrefix: l
  } = o;
  let u = i || ((T = r.options) == null ? void 0 : T.defaultNS);
  u = dt(u) ? [u] : u || ["translation"], (R = (A = r.reportNamespaces).addUsedNamespaces) == null || R.call(A, u);
  const c = (r.isInitialized || r.initializedStoreOnce) && u.every((C) => ko(C, r, o)), h = Zo(r, t.lng || null, o.nsMode === "fallback" ? u : u[0], l), f = () => h, d = () => _i(r, t.lng || null, o.nsMode === "fallback" ? u : u[0], l), [p, m] = ce(f);
  let g = u.join();
  t.lng && (g = `${t.lng}${g}`);
  const y = Jo(g), S = Z(!0);
  mt(() => {
    const {
      bindI18n: C,
      bindI18nStore: O
    } = o;
    S.current = !0, !c && !a && (t.lng ? us(r, t.lng, u, () => {
      S.current && m(d);
    }) : He(r, u, () => {
      S.current && m(d);
    })), c && y && y !== g && S.current && m(d);
    const b = () => {
      S.current && m(d);
    };
    return C && (r == null || r.on(C, b)), O && (r == null || r.store.on(O, b)), () => {
      S.current = !1, r && (C == null || C.split(" ").forEach((L) => r.off(L, b))), O && r && O.split(" ").forEach((L) => r.store.off(L, b));
    };
  }, [r, g]), mt(() => {
    S.current && c && m(f);
  }, [r, l, c]);
  const v = [p, r, c];
  if (v.t = p, v.i18n = r, v.ready = c, c || !c && !a) return v;
  throw new Promise((C) => {
    t.lng ? us(r, t.lng, u, () => C()) : He(r, u, () => C());
  });
}, ta = "Home", ea = "Search", na = "Explore Tools and Content", sa = "Tools", ia = "Favorites", ra = "About Us", oa = "Features", aa = "Help & Feedback", la = "Terms of Use", ua = "Privacy Policy", ca = "Sign In", ha = "Logout", fa = "Settings", da = "Sign Up", pa = "Join the community", ma = "Oncology News for You", ga = "User Reviews", ya = "Social Media", Sa = "Find what you are looking for using ONCOassist’s AI powered search", va = "Find what you are looking for using ONCOassist’s global search", Ca = "Sign in to save items", Ta = "Sign in to access tools", Aa = "Sign in to ONCOassist to use the available medical tools and calculators.", xa = "Use the save icon throughout ONCOassist to add items to this section", Ea = "Sign in to access your profile", Pa = "Sign in to ONCOassist to view and manage your profile.", Ra = "Create an Account", Oa = "Profile", ba = "Formulas", La = "Prognostic Scores", wa = "AJCC / TNM Staging", Ia = "Toxicity Grading (CTC AE)", Na = "NCCN Treatment Protocols", Ma = "Drug Info", Da = "Drug Interaction Checker", Va = "Adjuvant Tools", _a = "Advanced Breast Cancer Tool", Fa = "ONCOvideos", ka = "IO Toxicity Tool", $a = "Product Services", Ba = "Body Mass Index", Ua = "Body Surface Area / Chemotherapy Dose Calculator", ja = "Advanced Myelofibrosis Scoring Tool", Ga = "CARG (Cancer and Aging Research Group) Score", Ka = "Breast Cancer", Ha = "Colon Cancer", Wa = "GIST", za = "Lung Cancer", Ya = "Melanoma Tool", qa = "Carboplatin Dose(Using Cockroft-Gault Equation for GFR)", Xa = "Carboplatin Dose(Using Wright Equation for GFR)", Ja = "Child-Pugh Score", Za = "Corrected Calcium", Qa = "Corrected QT Interval (QTc)", tl = "Creatinine Clearance (GFR) Using Cockroft-Gault Equation", el = "Creatinine Clearance (GFR) Using Wright Equation", nl = "ECOG Performance Score", sl = "Glasgow Coma Scale", il = "Ideal Body Weight and Adjusted Body Weight", rl = "Karnofsky Performance Score", ol = "Khorana Score (Risk of chemotherapy associated VTE)", al = "MASCC Risk Index(Risk of developing serious complications from febrile neutropenia)", ll = "Opiate Analgesic Converter", ul = "PSA Doubling Time Calculator", cl = "Smoking Pack Years", hl = "Steroid Equivalence Converter", fl = "Upper Limb Veins", dl = "Wells Score DVT", pl = "Wells Score PE", ml = "Clinical Treatment Score 5 (CTS5)", gl = "CMML Prognostic Score", yl = "CPS+EG Breast Cancer Prognostic Score", Sl = "CRP-Bellmunt Prognostic score in Urothelial Carcinoma", vl = "EUTOS Prognostic Score for CML", Cl = "FLIPI", Tl = "FLIPI2", Al = "Geriatric Assessment (G8) Tool", xl = "German Hodgkin Lymphoma Risk Groups", El = "IMDC prognostic score For Advanced Renal Cell Carcinoma", Pl = "International Prognostic Index for Chronic Lymphocytic Leukemia (CLL-IPI)", Rl = "IPI for Advanced Hodgkin Lymphoma", Ol = "Lung Immuno-Oncology Prognostic Score (LIPS3)", bl = "Manchester Score for Small-Cell Lung Cancer", Ll = "MDS Erythroid Response Prognostic Tool", wl = "MGUS Prognostic Tool", Il = "MSKCC risk score for metastatic Renal cell carcinoma", Nl = "R-ISS Prognostic Tool", Ml = "Revised International Prognostic Scoring System (IPSS-R) for Myelodysplastic Syndrome (MDS)", Dl = "Revised IPI for Diffuse Large B-cell Lymphoma", Vl = "Risk of Bone Marrow involvement for patients with Hodgkin Lymphoma", _l = "Risk Stratification for Advanced Germ Cell Tumours", Fl = "SINS Prognostic Tool", kl = "SSIGN Score for Renal Cell Carcinoma (RCC)", $l = "Feedback", Bl = "Get Validated", Ul = "ONCOpatient", jl = "ASSURE RCC Prognostic Tool", Gl = "BED and EQD2 dose calculator", Kl = {
  HOME: ta,
  SEARCH: ea,
  SEARCH_PLACEHOLDER: na,
  TOOLS: sa,
  FAVORITES: ia,
  ABOUT_US: ra,
  FEATURES: oa,
  HELP_FEEDBACK: aa,
  TERMS_OF_USE: la,
  PRIVACY_POLICY: ua,
  SIGN_IN: ca,
  LOGOUT: ha,
  SETTINGS: fa,
  CREATE_ACCOUNT: da,
  JOIN_COMMUNITY: pa,
  ONCOLOGY_NEWS: ma,
  USER_REVIEWS: ga,
  SOCIAL_MEDIA: ya,
  AI_SEARCH_INFO: Sa,
  GLOBAL_SEARCH_INFO: va,
  SIGN_IN_TO_SAVE: Ca,
  SIGN_IN_TO_ACCESS_TOOLS: Ta,
  TOOLS_ACCESS_INFO: Aa,
  SAVE_ICON_INFO: xa,
  SIGN_IN_TO_ACCESS_PROFILE: Ea,
  PROFILE_ACCESS_INFO: Pa,
  CREATE_AN_ACCOUNT: Ra,
  PROFILE: Oa,
  FORMULAS: ba,
  PROGNOSTIC_SCORES: La,
  AJCC_TNM_STAGING: wa,
  TOXICITY_GRADING: Ia,
  NCCN_TREATMENT_PROTOCOLS: Na,
  DRUG_INFO: Ma,
  DRUG_INTERACTION_CHECKER: Da,
  ADJUVANT_TOOLS: Va,
  ADVANCED_BREAST_CANCER_TOOL: _a,
  ONCOVIDEOS: Fa,
  IO_TOXICITY_TOOL: ka,
  PRODUCT_SERVICES: $a,
  BODY_MASS_INDEX: Ba,
  BODY_SURFACE_AREA: Ua,
  MYELOFIBROSIS_SCORING_TOOL: ja,
  CARG_SCORE: Ga,
  BREAST_CANCER: Ka,
  COLON_CANCER: Ha,
  GIST: Wa,
  LUNG_CANCER: za,
  MELANOMA_TOOL: Ya,
  CARBOPLATIN_DOSAGE_CG: qa,
  CARBOPLATIN_DOSAGE_WRI: Xa,
  CHILD_PUGH_SCORE: Ja,
  CORRECTED_CALCIUM: Za,
  CORRECTED_QT_INTERVALS: Qa,
  CREATINE_CLEARENCE_CG: tl,
  CREATINE_CLEARENCE_WRI: el,
  ECOG_PERFORMANCE: nl,
  GLASGOW_COMA_SCALE: sl,
  IBW_ABW_FORMULA: il,
  KARNOFSKY_PERFORMANCE: rl,
  KHORANA_SCORE: ol,
  MASCC_RISK_INDEX: al,
  OPIATE_ANALGESIC_CONVERTER: ll,
  PSA_DOUBLING_TIME: ul,
  SMOKING_PACK_YEARS: cl,
  STEROID_EQUIVALENCE_CONVERTER: hl,
  UPPER_LIMB_VEINS: fl,
  WELLS_SCORE_DVT: dl,
  WELLS_SCORE_PE: pl,
  CTS5: ml,
  CMML: gl,
  CPS_EG_BREAST_CANCER: yl,
  CRP_BELLMUNT: Sl,
  EUTOS: vl,
  FLIPI: Cl,
  FLIPI2: Tl,
  GEREATRIC_ASSESSMENT: Al,
  GERMAN_HODGKIN_LYMPHOMA: xl,
  IMDC: El,
  CLL_IPI: Pl,
  IPI_AHL: Rl,
  LIPS3: Ol,
  MANCHESTER_SCORE: bl,
  MDS: Ll,
  MGUS: wl,
  MSKCC: Il,
  RISS: Nl,
  IPSSR: Ml,
  RIPI: Dl,
  RISK_BONE_MARROW: Vl,
  RISK_STRATIFICATION: _l,
  SINS: Fl,
  SSIGN: kl,
  FEEDBACK: $l,
  GET_VALIDATED: Bl,
  ONCOPATIENT: Ul,
  ASSURE_RCC: jl,
  BED_CALCULATOR: Gl
}, Hl = "Accueil", Wl = "Recherche", zl = "Outils", Yl = "Favoris", ql = "À propos de nous", Xl = "Fonctionnalités", Jl = "Aide et commentaires", Zl = "Conditions d'utilisation", Ql = "Politique de confidentialité", tu = "Se connecter", eu = "Se déconnecter", nu = "Créer un compte", su = "Rejoindre la communauté", iu = "Actualités en oncologie pour vous", ru = "Avis des utilisateurs", ou = "Effectuez votre recherche avec l’IA de ONCOassist", au = "Connectez-vous pour enregistrer des éléments", lu = "Médias Sociaux", uu = "Ajoutez des éléments à cette section en utilisant l'icône de sauvegarde dans toute l'application ONCOassist", cu = "Créer un compte", hu = "Profil", fu = "Formules", du = "Scores pronostiques", pu = "Mise en scène AJCC / TNM", mu = "Classification de la toxicité (CTC AE)", gu = "Protocoles de traitement NCCN", yu = "Informations sur les médicaments", Su = "Vérificateur d’interactions médicamenteuses", vu = "Outils adjuvants", Cu = "Outil pour le cancer du sein avancé", Tu = "ONCOvidéos", Au = "Outil de toxicité IO", xu = "Indice de masse corporelle", Eu = "Surface corporelle / Calculateur de dose de chimiothérapie", Pu = "Outil de score de myélofibrose avancé", Ru = "Score CARG (Cancer et vieillissement)", Ou = "Cancer du sein", bu = "Cancer du côlon", Lu = "GIST", wu = "Cancer du poumon", Iu = "Outil Mélanome", Nu = "Dosage du Carboplatine (GFR avec l'équation Cockroft-Gault)", Mu = "Dosage du Carboplatine (GFR avec l'équation Wright)", Du = "Score Child-Pugh", Vu = "Calcium corrigé", _u = "Intervalles QT corrigés (QTc)", Fu = "Clairance de la créatinine (GFR avec l'équation Cockroft-Gault)", ku = "Clairance de la créatinine (GFR avec l'équation Wright)", $u = "Score de performance ECOG", Bu = "Échelle de Glasgow", Uu = "Poids corporel idéal et ajusté", ju = "Score de performance de Karnofsky", Gu = "Score de Khorana (Risque de VTE lié à la chimiothérapie)", Ku = "Indice de risque MASCC (Risque de complications sévères liées à la fièvre neutropénique)", Hu = "Convertisseur d’analgésiques opioïdes", Wu = "Temps de doublement du PSA", zu = "Nombre de paquets-années de tabagisme", Yu = "Convertisseur d’équivalence des stéroïdes", qu = "Veines des membres supérieurs", Xu = "Score de Wells pour la TVP", Ju = "Score de Wells pour l’EP", Zu = "Score de traitement clinique 5 (CTS5)", Qu = "Score pronostique CMML", tc = "Score pronostique CPS+EG pour le cancer du sein", ec = "Score pronostique CRP-Bellmunt pour le carcinome urothélial", nc = "Score pronostique EUTOS pour la LMC", sc = "FLIPI", ic = "FLIPI2", rc = "Outil d’évaluation gériatrique (G8)", oc = "Groupe de risque allemand pour le lymphome de Hodgkin", ac = "Score pronostique IMDC pour le carcinome rénal avancé", lc = "Indice pronostique international pour la LLC (CLL-IPI)", uc = "IPI pour le lymphome de Hodgkin avancé", cc = "Score pronostique pulmonaire en immuno-oncologie (LIPS3)", hc = "Score de Manchester pour le cancer du poumon à petites cellules", fc = "Outil pronostique de réponse érythroïde MDS", dc = "Outil pronostique MGUS", pc = "Score de risque MSKCC pour le carcinome rénal métastatique", mc = "Outil pronostique R-ISS", gc = "Système de score pronostique international révisé (IPSS-R) pour le syndrome myélodysplasique (MDS)", yc = "Indice pronostique international révisé (R-IPI) pour le lymphome B diffus à grandes cellules", Sc = "Risque d’atteinte de la moelle osseuse chez les patients atteints de lymphome de Hodgkin", vc = "Stratification du risque pour les tumeurs germinales avancées", Cc = "Outil pronostique SINS", Tc = "Score SSIGN pour le carcinome rénal (RCC)", Ac = "Feedback", xc = {
  HOME: Hl,
  SEARCH: Wl,
  TOOLS: zl,
  FAVORITES: Yl,
  ABOUT_US: ql,
  FEATURES: Xl,
  HELP_FEEDBACK: Jl,
  TERMS_OF_USE: Zl,
  PRIVACY_POLICY: Ql,
  SIGN_IN: tu,
  SIGN_OUT: eu,
  CREATE_ACCOUNT: nu,
  JOIN_COMMUNITY: su,
  ONCOLOGY_NEWS: iu,
  USER_REVIEWS: ru,
  AI_SEARCH_INFO: ou,
  SIGN_IN_TO_SAVE: au,
  SOCIAL_MEDIA: lu,
  SAVE_ICON_INFO: uu,
  CREATE_AN_ACCOUNT: cu,
  PROFILE: hu,
  FORMULAS: fu,
  PROGNOSTIC_SCORES: du,
  AJCC_TNM_STAGING: pu,
  TOXICITY_GRADING: mu,
  NCCN_TREATMENT_PROTOCOLS: gu,
  DRUG_INFO: yu,
  DRUG_INTERACTION_CHECKER: Su,
  ADJUVANT_TOOLS: vu,
  ADVANCED_BREAST_CANCER_TOOL: Cu,
  ONCOVIDEOS: Tu,
  IO_TOXICITY_TOOL: Au,
  BODY_MASS_INDEX: xu,
  BODY_SURFACE_AREA: Eu,
  MYELOFIBROSIS_SCORING_TOOL: Pu,
  CARG_SCORE: Ru,
  BREAST_CANCER: Ou,
  COLON_CANCER: bu,
  GIST: Lu,
  LUNG_CANCER: wu,
  MELANOMA_TOOL: Iu,
  CARBOPLATIN_DOSAGE_CG: Nu,
  CARBOPLATIN_DOSAGE_WRI: Mu,
  CHILD_PUGH_SCORE: Du,
  CORRECTED_CALCIUM: Vu,
  CORRECTED_QT_INTERVALS: _u,
  CREATINE_CLEARENCE_CG: Fu,
  CREATINE_CLEARENCE_WRI: ku,
  ECOG_PERFORMANCE: $u,
  GLASGOW_COMA_SCALE: Bu,
  IBW_ABW_FORMULA: Uu,
  KARNOFSKY_PERFORMANCE: ju,
  KHORANA_SCORE: Gu,
  MASCC_RISK_INDEX: Ku,
  OPIATE_ANALGESIC_CONVERTER: Hu,
  PSA_DOUBLING_TIME: Wu,
  SMOKING_PACK_YEARS: zu,
  STEROID_EQUIVALENCE_CONVERTER: Yu,
  UPPER_LIMB_VEINS: qu,
  WELLS_SCORE_DVT: Xu,
  WELLS_SCORE_PE: Ju,
  CTS5: Zu,
  CMML: Qu,
  CPS_EG_BREAST_CANCER: tc,
  CRP_BELLMUNT: ec,
  EUTOS: nc,
  FLIPI: sc,
  FLIPI2: ic,
  GEREATRIC_ASSESSMENT: rc,
  GERMAN_HODGKIN_LYMPHOMA: oc,
  IMDC: ac,
  CLL_IPI: lc,
  IPI_AHL: uc,
  LIPS3: cc,
  MANCHESTER_SCORE: hc,
  MDS: fc,
  MGUS: dc,
  MSKCC: pc,
  RISS: mc,
  IPSSR: gc,
  RIPI: yc,
  RISK_BONE_MARROW: Sc,
  RISK_STRATIFICATION: vc,
  SINS: Cc,
  SSIGN: Tc,
  FEEDBACK: Ac
}, cs = {
  en: Kl,
  fr: xc
};
B.use(Yo).init({
  resources: {
    en: { translation: cs.en },
    fr: { translation: cs.fr }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: !1
  }
});
const fn = yt({});
function dn(e) {
  const t = Z(null);
  return t.current === null && (t.current = e()), t.current;
}
const xe = /* @__PURE__ */ yt(null), pn = yt({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
class Ec extends cn.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const s = n.offsetParent, i = s instanceof HTMLElement && s.offsetWidth || 0, r = this.props.sizeRef.current;
      r.height = n.offsetHeight || 0, r.width = n.offsetWidth || 0, r.top = n.offsetTop, r.left = n.offsetLeft, r.right = i - r.width - r.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function Pc({ children: e, isPresent: t, anchorX: n }) {
  const s = hn(), i = Z(null), r = Z({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: o } = F(pn);
  return wi(() => {
    const { width: a, height: l, top: u, left: c, right: h } = r.current;
    if (t || !i.current || !a || !l)
      return;
    const f = n === "left" ? `left: ${c}` : `right: ${h}`;
    i.current.dataset.motionPopId = s;
    const d = document.createElement("style");
    return o && (d.nonce = o), document.head.appendChild(d), d.sheet && d.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${a}px !important;
            height: ${l}px !important;
            ${f}px !important;
            top: ${u}px !important;
          }
        `), () => {
      document.head.removeChild(d);
    };
  }, [t]), st(Ec, { isPresent: t, childRef: i, sizeRef: r, children: cn.cloneElement(e, { ref: i }) });
}
const Rc = ({ children: e, initial: t, isPresent: n, onExitComplete: s, custom: i, presenceAffectsLayout: r, mode: o, anchorX: a }) => {
  const l = dn(Oc), u = hn(), c = Te((f) => {
    l.set(f, !0);
    for (const d of l.values())
      if (!d)
        return;
    s && s();
  }, [l, s]), h = gt(
    () => ({
      id: u,
      initial: t,
      isPresent: n,
      custom: i,
      onExitComplete: c,
      register: (f) => (l.set(f, !1), () => l.delete(f))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    r ? [Math.random(), c] : [n, c]
  );
  return gt(() => {
    l.forEach((f, d) => l.set(d, !1));
  }, [n]), cn.useEffect(() => {
    !n && !l.size && s && s();
  }, [n]), o === "popLayout" && (e = st(Pc, { isPresent: n, anchorX: a, children: e })), st(xe.Provider, { value: h, children: e });
};
function Oc() {
  return /* @__PURE__ */ new Map();
}
function Fi(e = !0) {
  const t = F(xe);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = t, r = hn();
  mt(() => {
    e && i(r);
  }, [e]);
  const o = Te(() => e && s && s(r), [r, s, e]);
  return !n && s ? [!1, o] : [!0];
}
const se = (e) => e.key || "";
function hs(e) {
  const t = [];
  return fo.forEach(e, (n) => {
    po(n) && t.push(n);
  }), t;
}
const mn = typeof window < "u", ki = mn ? mo : mt, bc = ({ children: e, custom: t, initial: n = !0, onExitComplete: s, presenceAffectsLayout: i = !0, mode: r = "sync", propagate: o = !1, anchorX: a = "left" }) => {
  const [l, u] = Fi(o), c = gt(() => hs(e), [e]), h = o && !l ? [] : c.map(se), f = Z(!0), d = Z(c), p = dn(() => /* @__PURE__ */ new Map()), [m, g] = ce(c), [y, S] = ce(c);
  ki(() => {
    f.current = !1, d.current = c;
    for (let T = 0; T < y.length; T++) {
      const A = se(y[T]);
      h.includes(A) ? p.delete(A) : p.get(A) !== !0 && p.set(A, !1);
    }
  }, [y, h.length, h.join("-")]);
  const v = [];
  if (c !== m) {
    let T = [...c];
    for (let A = 0; A < y.length; A++) {
      const R = y[A], C = se(R);
      h.includes(C) || (T.splice(A, 0, R), v.push(R));
    }
    return r === "wait" && v.length && (T = v), S(hs(T)), g(c), null;
  }
  process.env.NODE_ENV !== "production" && r === "wait" && y.length > 1 && console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  const { forceRender: E } = F(fn);
  return st(ho, { children: y.map((T) => {
    const A = se(T), R = o && !l ? !1 : c === y || h.includes(A), C = () => {
      if (p.has(A))
        p.set(A, !0);
      else
        return;
      let O = !0;
      p.forEach((b) => {
        b || (O = !1);
      }), O && (E == null || E(), S(d.current), o && (u == null || u()), s && s());
    };
    return st(Rc, { isPresent: R, initial: !f.current || n ? void 0 : !1, custom: t, presenceAffectsLayout: i, mode: r, onExitComplete: R ? void 0 : C, anchorX: a, children: T }, A);
  }) });
}, G = /* @__NO_SIDE_EFFECTS__ */ (e) => e;
let wt = G, ot = G;
process.env.NODE_ENV !== "production" && (wt = (e, t) => {
  !e && typeof console < "u" && console.warn(t);
}, ot = (e, t) => {
  if (!e)
    throw new Error(t);
});
// @__NO_SIDE_EFFECTS__
function gn(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Ot = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const s = t - e;
  return s === 0 ? 1 : (n - e) / s;
}, Q = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, nt = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, Lc = {
  useManualTiming: !1
}, ie = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
], fs = {
  value: null
};
function wc(e, t) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, l = 0;
  function u(h) {
    o.has(h) && (c.schedule(h), e()), l++, h(a);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (h, f = !1, d = !1) => {
      const m = d && i ? n : s;
      return f && o.add(h), m.has(h) || m.add(h), h;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (h) => {
      s.delete(h), o.delete(h);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (h) => {
      if (a = h, i) {
        r = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(u), t && fs.value && fs.value.frameloop[t].push(l), l = 0, n.clear(), i = !1, r && (r = !1, c.process(h));
    }
  };
  return c;
}
const Ic = 40;
function $i(e, t) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = ie.reduce((y, S) => (y[S] = wc(r, t ? S : void 0), y), {}), { read: a, resolveKeyframes: l, update: u, preRender: c, render: h, postRender: f } = o, d = () => {
    const y = performance.now();
    n = !1, i.delta = s ? 1e3 / 60 : Math.max(Math.min(y - i.timestamp, Ic), 1), i.timestamp = y, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), h.process(i), f.process(i), i.isProcessing = !1, n && t && (s = !1, e(d));
  }, p = () => {
    n = !0, s = !0, i.isProcessing || e(d);
  };
  return { schedule: ie.reduce((y, S) => {
    const v = o[S];
    return y[S] = (E, T = !1, A = !1) => (n || p(), v.schedule(E, T, A)), y;
  }, {}), cancel: (y) => {
    for (let S = 0; S < ie.length; S++)
      o[ie[S]].cancel(y);
  }, state: i, steps: o };
}
const { schedule: w, cancel: at, state: _, steps: we } = $i(typeof requestAnimationFrame < "u" ? requestAnimationFrame : G, !0), Bi = yt({ strict: !1 }), ds = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, bt = {};
for (const e in ds)
  bt[e] = {
    isEnabled: (t) => ds[e].some((n) => !!t[n])
  };
function Nc(e) {
  for (const t in e)
    bt[t] = {
      ...bt[t],
      ...e[t]
    };
}
const Mc = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function me(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || Mc.has(e);
}
let Ui = (e) => !me(e);
function Dc(e) {
  e && (Ui = (t) => t.startsWith("on") ? !me(t) : e(t));
}
try {
  Dc(require("@emotion/is-prop-valid").default);
} catch {
}
function Vc(e, t, n) {
  const s = {};
  for (const i in e)
    i === "values" && typeof e.values == "object" || (Ui(i) || n === !0 && me(i) || !t && !me(i) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && i.startsWith("onDrag")) && (s[i] = e[i]);
  return s;
}
const ps = /* @__PURE__ */ new Set();
function Ee(e, t, n) {
  e || ps.has(t) || (console.warn(t), ps.add(t));
}
function _c(e) {
  if (typeof Proxy > "u")
    return e;
  const t = /* @__PURE__ */ new Map(), n = (...s) => (process.env.NODE_ENV !== "production" && Ee(!1, "motion() is deprecated. Use motion.create() instead."), e(...s));
  return new Proxy(n, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (s, i) => i === "create" ? e : (t.has(i) || t.set(i, e(i)), t.get(i))
  });
}
const Pe = /* @__PURE__ */ yt({});
function Re(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Kt(e) {
  return typeof e == "string" || Array.isArray(e);
}
const yn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sn = ["initial", ...yn];
function Oe(e) {
  return Re(e.animate) || Sn.some((t) => Kt(e[t]));
}
function ji(e) {
  return !!(Oe(e) || e.variants);
}
function Fc(e, t) {
  if (Oe(e)) {
    const { initial: n, animate: s } = e;
    return {
      initial: n === !1 || Kt(n) ? n : void 0,
      animate: Kt(s) ? s : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function kc(e) {
  const { initial: t, animate: n } = Fc(e, F(Pe));
  return gt(() => ({ initial: t, animate: n }), [ms(t), ms(n)]);
}
function ms(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const $c = Symbol.for("motionComponentSymbol");
function At(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function Bc(e, t, n) {
  return Te(
    (s) => {
      s && e.onMount && e.onMount(s), t && (s ? t.mount(s) : t.unmount()), n && (typeof n == "function" ? n(s) : At(n) && (n.current = s));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [t]
  );
}
const vn = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Uc = "framerAppearId", Gi = "data-" + vn(Uc), { schedule: Cn } = $i(queueMicrotask, !1), Ki = yt({});
function jc(e, t, n, s, i) {
  var r, o;
  const { visualElement: a } = F(Pe), l = F(Bi), u = F(xe), c = F(pn).reducedMotion, h = Z(null);
  s = s || l.renderer, !h.current && s && (h.current = s(e, {
    visualState: t,
    parent: a,
    props: n,
    presenceContext: u,
    blockInitialAnimation: u ? u.initial === !1 : !1,
    reducedMotionConfig: c
  }));
  const f = h.current, d = F(Ki);
  f && !f.projection && i && (f.type === "html" || f.type === "svg") && Gc(h.current, n, i, d);
  const p = Z(!1);
  wi(() => {
    f && p.current && f.update(n, u);
  });
  const m = n[Gi], g = Z(!!m && !(!((r = window.MotionHandoffIsComplete) === null || r === void 0) && r.call(window, m)) && ((o = window.MotionHasOptimisedAnimation) === null || o === void 0 ? void 0 : o.call(window, m)));
  return ki(() => {
    f && (p.current = !0, window.MotionIsMounted = !0, f.updateFeatures(), Cn.render(f.render), g.current && f.animationState && f.animationState.animateChanges());
  }), mt(() => {
    f && (!g.current && f.animationState && f.animationState.animateChanges(), g.current && (queueMicrotask(() => {
      var y;
      (y = window.MotionHandoffMarkAsComplete) === null || y === void 0 || y.call(window, m);
    }), g.current = !1));
  }), f;
}
function Gc(e, t, n, s) {
  const { layoutId: i, layout: r, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Hi(e.parent)), e.projection.setOptions({
    layoutId: i,
    layout: r,
    alwaysMeasureLayout: !!o || a && At(a),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof r == "string" ? r : "both",
    initialPromotionConfig: s,
    layoutScroll: l,
    layoutRoot: u
  });
}
function Hi(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : Hi(e.parent);
}
function Kc({ preloadedFeatures: e, createVisualElement: t, useRender: n, useVisualState: s, Component: i }) {
  var r, o;
  e && Nc(e);
  function a(u, c) {
    let h;
    const f = {
      ...F(pn),
      ...u,
      layoutId: Hc(u)
    }, { isStatic: d } = f, p = kc(u), m = s(u, d);
    if (!d && mn) {
      Wc(f, e);
      const g = zc(f);
      h = g.MeasureLayout, p.visualElement = jc(i, m, f, t, g.ProjectionNode);
    }
    return Li(Pe.Provider, { value: p, children: [h && p.visualElement ? st(h, { visualElement: p.visualElement, ...f }) : null, n(i, u, Bc(m, p.visualElement, c), m, d, p.visualElement)] });
  }
  a.displayName = `motion.${typeof i == "string" ? i : `create(${(o = (r = i.displayName) !== null && r !== void 0 ? r : i.name) !== null && o !== void 0 ? o : ""})`}`;
  const l = go(a);
  return l[$c] = i, l;
}
function Hc({ layoutId: e }) {
  const t = F(fn).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Wc(e, t) {
  const n = F(Bi).strict;
  if (process.env.NODE_ENV !== "production" && t && n) {
    const s = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    e.ignoreStrict ? wt(!1, s) : ot(!1, s);
  }
}
function zc(e) {
  const { drag: t, layout: n } = bt;
  if (!t && !n)
    return {};
  const s = { ...t, ...n };
  return {
    MeasureLayout: t != null && t.isEnabled(e) || n != null && n.isEnabled(e) ? s.MeasureLayout : void 0,
    ProjectionNode: s.ProjectionNode
  };
}
const Wi = (e) => (t) => typeof t == "string" && t.startsWith(e), Tn = /* @__PURE__ */ Wi("--"), Yc = /* @__PURE__ */ Wi("var(--"), An = (e) => Yc(e) ? qc.test(e.split("/*")[0].trim()) : !1, qc = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Ht = {};
function Xc(e) {
  for (const t in e)
    Ht[t] = e[t], Tn(t) && (Ht[t].isCSSVariable = !0);
}
const It = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], St = new Set(It);
function zi(e, { layout: t, layoutId: n }) {
  return St.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Ht[e] || e === "opacity");
}
const $ = (e) => !!(e && e.getVelocity), Yi = (e, t) => t && typeof e == "number" ? t.transform(e) : e, it = (e, t, n) => n > t ? t : n < e ? e : n, Nt = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, Wt = {
  ...Nt,
  transform: (e) => it(0, 1, e)
}, re = {
  ...Nt,
  default: 1
}, Jt = (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), rt = /* @__PURE__ */ Jt("deg"), tt = /* @__PURE__ */ Jt("%"), x = /* @__PURE__ */ Jt("px"), Jc = /* @__PURE__ */ Jt("vh"), Zc = /* @__PURE__ */ Jt("vw"), gs = {
  ...tt,
  parse: (e) => tt.parse(e) / 100,
  transform: (e) => tt.transform(e * 100)
}, Qc = {
  // Border props
  borderWidth: x,
  borderTopWidth: x,
  borderRightWidth: x,
  borderBottomWidth: x,
  borderLeftWidth: x,
  borderRadius: x,
  radius: x,
  borderTopLeftRadius: x,
  borderTopRightRadius: x,
  borderBottomRightRadius: x,
  borderBottomLeftRadius: x,
  // Positioning props
  width: x,
  maxWidth: x,
  height: x,
  maxHeight: x,
  top: x,
  right: x,
  bottom: x,
  left: x,
  // Spacing props
  padding: x,
  paddingTop: x,
  paddingRight: x,
  paddingBottom: x,
  paddingLeft: x,
  margin: x,
  marginTop: x,
  marginRight: x,
  marginBottom: x,
  marginLeft: x,
  // Misc
  backgroundPositionX: x,
  backgroundPositionY: x
}, th = {
  rotate: rt,
  rotateX: rt,
  rotateY: rt,
  rotateZ: rt,
  scale: re,
  scaleX: re,
  scaleY: re,
  scaleZ: re,
  skew: rt,
  skewX: rt,
  skewY: rt,
  distance: x,
  translateX: x,
  translateY: x,
  translateZ: x,
  x,
  y: x,
  z: x,
  perspective: x,
  transformPerspective: x,
  opacity: Wt,
  originX: gs,
  originY: gs,
  originZ: x
}, ys = {
  ...Nt,
  transform: Math.round
}, xn = {
  ...Qc,
  ...th,
  zIndex: ys,
  size: x,
  // SVG
  fillOpacity: Wt,
  strokeOpacity: Wt,
  numOctaves: ys
}, eh = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, nh = It.length;
function sh(e, t, n) {
  let s = "", i = !0;
  for (let r = 0; r < nh; r++) {
    const o = It[r], a = e[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = Yi(a, xn[o]);
      if (!l) {
        i = !1;
        const c = eh[o] || o;
        s += `${c}(${u}) `;
      }
      n && (t[o] = u);
    }
  }
  return s = s.trim(), n ? s = n(t, i ? "" : s) : i && (s = "none"), s;
}
function En(e, t, n) {
  const { style: s, vars: i, transformOrigin: r } = e;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (St.has(l)) {
      o = !0;
      continue;
    } else if (Tn(l)) {
      i[l] = u;
      continue;
    } else {
      const c = Yi(u, xn[l]);
      l.startsWith("origin") ? (a = !0, r[l] = c) : s[l] = c;
    }
  }
  if (t.transform || (o || n ? s.transform = sh(t, e.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Pn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function qi(e, t, n) {
  for (const s in t)
    !$(t[s]) && !zi(s, n) && (e[s] = t[s]);
}
function ih({ transformTemplate: e }, t) {
  return gt(() => {
    const n = Pn();
    return En(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function rh(e, t) {
  const n = e.style || {}, s = {};
  return qi(s, n, e), Object.assign(s, ih(e, t)), s;
}
function oh(e, t) {
  const n = {}, s = rh(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const ah = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Rn(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(ah.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
const lh = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, uh = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ch(e, t, n = 1, s = 0, i = !0) {
  e.pathLength = 1;
  const r = i ? lh : uh;
  e[r.offset] = x.transform(-s);
  const o = x.transform(t), a = x.transform(n);
  e[r.array] = `${o} ${a}`;
}
function Ss(e, t, n) {
  return typeof e == "string" ? e : x.transform(t + n * e);
}
function hh(e, t, n) {
  const s = Ss(t, e.x, e.width), i = Ss(n, e.y, e.height);
  return `${s} ${i}`;
}
function On(e, {
  attrX: t,
  attrY: n,
  attrScale: s,
  originX: i,
  originY: r,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...u
}, c, h) {
  if (En(e, u, h), c) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: f, style: d, dimensions: p } = e;
  f.transform && (p && (d.transform = f.transform), delete f.transform), p && (i !== void 0 || r !== void 0 || d.transform) && (d.transformOrigin = hh(p, i !== void 0 ? i : 0.5, r !== void 0 ? r : 0.5)), t !== void 0 && (f.x = t), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), o !== void 0 && ch(f, o, a, l, !1);
}
const Xi = () => ({
  ...Pn(),
  attrs: {}
}), bn = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function fh(e, t, n, s) {
  const i = gt(() => {
    const r = Xi();
    return On(r, t, bn(s), e.transformTemplate), {
      ...r.attrs,
      style: { ...r.style }
    };
  }, [t]);
  if (e.style) {
    const r = {};
    qi(r, e.style, e), i.style = { ...r, ...i.style };
  }
  return i;
}
function dh(e = !1) {
  return (n, s, i, { latestValues: r }, o) => {
    const l = (Rn(n) ? fh : oh)(s, r, o, n), u = Vc(s, typeof n == "string", e), c = n !== Ii ? { ...u, ...l, ref: i } : {}, { children: h } = s, f = gt(() => $(h) ? h.get() : h, [h]);
    return yo(n, {
      ...c,
      children: f
    });
  };
}
function vs(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, s) => {
    t[0][s] = n.get(), t[1][s] = n.getVelocity();
  }), t;
}
function Ln(e, t, n, s) {
  if (typeof t == "function") {
    const [i, r] = vs(s);
    t = t(n !== void 0 ? n : e.custom, i, r);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [i, r] = vs(s);
    t = t(n !== void 0 ? n : e.custom, i, r);
  }
  return t;
}
const ze = (e) => Array.isArray(e), ph = (e) => !!(e && typeof e == "object" && e.mix && e.toValue), mh = (e) => ze(e) ? e[e.length - 1] || 0 : e;
function ae(e) {
  const t = $(e) ? e.get() : e;
  return ph(t) ? t.toValue() : t;
}
function gh({ scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: n }, s, i, r) {
  const o = {
    latestValues: yh(s, i, r, e),
    renderState: t()
  };
  return n && (o.onMount = (a) => n({ props: s, current: a, ...o }), o.onUpdate = (a) => n(a)), o;
}
const Ji = (e) => (t, n) => {
  const s = F(Pe), i = F(xe), r = () => gh(e, t, s, i);
  return n ? r() : dn(r);
};
function yh(e, t, n, s) {
  const i = {}, r = s(e, {});
  for (const f in r)
    i[f] = ae(r[f]);
  let { initial: o, animate: a } = e;
  const l = Oe(e), u = ji(e);
  t && u && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const h = c ? a : o;
  if (h && typeof h != "boolean" && !Re(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let d = 0; d < f.length; d++) {
      const p = Ln(e, f[d]);
      if (p) {
        const { transitionEnd: m, transition: g, ...y } = p;
        for (const S in y) {
          let v = y[S];
          if (Array.isArray(v)) {
            const E = c ? v.length - 1 : 0;
            v = v[E];
          }
          v !== null && (i[S] = v);
        }
        for (const S in m)
          i[S] = m[S];
      }
    }
  }
  return i;
}
function wn(e, t, n) {
  var s;
  const { style: i } = e, r = {};
  for (const o in i)
    ($(i[o]) || t.style && $(t.style[o]) || zi(o, e) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (r[o] = i[o]);
  return r;
}
const Sh = {
  useVisualState: Ji({
    scrapeMotionValuesFromProps: wn,
    createRenderState: Pn
  })
};
function Zi(e, t) {
  try {
    t.dimensions = typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
  } catch {
    t.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
}
function Qi(e, { style: t, vars: n }, s, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(s));
  for (const r in n)
    e.style.setProperty(r, n[r]);
}
const tr = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function er(e, t, n, s) {
  Qi(e, t, void 0, s);
  for (const i in t.attrs)
    e.setAttribute(tr.has(i) ? i : vn(i), t.attrs[i]);
}
function nr(e, t, n) {
  const s = wn(e, t, n);
  for (const i in e)
    if ($(e[i]) || $(t[i])) {
      const r = It.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = e[i];
    }
  return s;
}
const Cs = ["x", "y", "width", "height", "cx", "cy", "r"], vh = {
  useVisualState: Ji({
    scrapeMotionValuesFromProps: nr,
    createRenderState: Xi,
    onUpdate: ({ props: e, prevProps: t, current: n, renderState: s, latestValues: i }) => {
      if (!n)
        return;
      let r = !!e.drag;
      if (!r) {
        for (const a in i)
          if (St.has(a)) {
            r = !0;
            break;
          }
      }
      if (!r)
        return;
      let o = !t;
      if (t)
        for (let a = 0; a < Cs.length; a++) {
          const l = Cs[a];
          e[l] !== t[l] && (o = !0);
        }
      o && w.read(() => {
        Zi(n, s), w.render(() => {
          On(s, i, bn(n.tagName), e.transformTemplate), er(n, s);
        });
      });
    }
  })
};
function Ch(e, t) {
  return function(s, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const o = {
      ...Rn(s) ? vh : Sh,
      preloadedFeatures: e,
      useRender: dh(i),
      createVisualElement: t,
      Component: s
    };
    return Kc(o);
  };
}
function zt(e, t, n) {
  const s = e.getProps();
  return Ln(s, t, n !== void 0 ? n : s.custom, e);
}
const Th = /* @__PURE__ */ gn(() => window.ScrollTimeline !== void 0);
class Ah {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => "finished" in t ? t.finished : t));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][t] = n;
  }
  attachTimeline(t, n) {
    const s = this.animations.map((i) => {
      if (Th() && i.attachTimeline)
        return i.attachTimeline(t);
      if (typeof n == "function")
        return n(i);
    });
    return () => {
      s.forEach((i, r) => {
        i && i(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++)
      t = Math.max(t, this.animations[n].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class xh extends Ah {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n);
  }
}
function In(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
const Ye = 2e4;
function sr(e) {
  let t = 0;
  const n = 50;
  let s = e.next(t);
  for (; !s.done && t < Ye; )
    t += n, s = e.next(t);
  return t >= Ye ? 1 / 0 : t;
}
function Nn(e) {
  return typeof e == "function";
}
function Ts(e, t) {
  e.timeline = t, e.onfinish = null;
}
const Mn = (e) => Array.isArray(e) && typeof e[0] == "number", Eh = {
  linearEasing: void 0
};
function Ph(e, t) {
  const n = /* @__PURE__ */ gn(e);
  return () => {
    var s;
    return (s = Eh[t]) !== null && s !== void 0 ? s : n();
  };
}
const ge = /* @__PURE__ */ Ph(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ir = (e, t, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(t / n), 2);
  for (let r = 0; r < i; r++)
    s += e(/* @__PURE__ */ Ot(0, i - 1, r)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
};
function rr(e) {
  return !!(typeof e == "function" && ge() || !e || typeof e == "string" && (e in qe || ge()) || Mn(e) || Array.isArray(e) && e.every(rr));
}
const _t = ([e, t, n, s]) => `cubic-bezier(${e}, ${t}, ${n}, ${s})`, qe = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ _t([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ _t([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ _t([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ _t([0.33, 1.53, 0.69, 0.99])
};
function or(e, t) {
  if (e)
    return typeof e == "function" && ge() ? ir(e, t) : Mn(e) ? _t(e) : Array.isArray(e) ? e.map((n) => or(n, t) || qe.easeOut) : qe[e];
}
const q = {
  x: !1,
  y: !1
};
function ar() {
  return q.x || q.y;
}
function Rh(e, t, n) {
  var s;
  if (e instanceof Element)
    return [e];
  if (typeof e == "string") {
    let i = document;
    const r = (s = void 0) !== null && s !== void 0 ? s : i.querySelectorAll(e);
    return r ? Array.from(r) : [];
  }
  return Array.from(e);
}
function lr(e, t) {
  const n = Rh(e), s = new AbortController(), i = {
    passive: !0,
    ...t,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function As(e) {
  return !(e.pointerType === "touch" || ar());
}
function Oh(e, t, n = {}) {
  const [s, i, r] = lr(e, n), o = (a) => {
    if (!As(a))
      return;
    const { target: l } = a, u = t(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      As(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, i);
  };
  return s.forEach((a) => {
    a.addEventListener("pointerenter", o, i);
  }), r;
}
const ur = (e, t) => t ? e === t ? !0 : ur(e, t.parentElement) : !1, Dn = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, bh = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Lh(e) {
  return bh.has(e.tagName) || e.tabIndex !== -1;
}
const Ft = /* @__PURE__ */ new WeakSet();
function xs(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Ie(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const wh = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const s = xs(() => {
    if (Ft.has(n))
      return;
    Ie(n, "down");
    const i = xs(() => {
      Ie(n, "up");
    }), r = () => Ie(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", r, t);
  });
  n.addEventListener("keydown", s, t), n.addEventListener("blur", () => n.removeEventListener("keydown", s), t);
};
function Es(e) {
  return Dn(e) && !ar();
}
function Ih(e, t, n = {}) {
  const [s, i, r] = lr(e, n), o = (a) => {
    const l = a.currentTarget;
    if (!Es(a) || Ft.has(l))
      return;
    Ft.add(l);
    const u = t(l, a), c = (d, p) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", f), !(!Es(d) || !Ft.has(l)) && (Ft.delete(l), typeof u == "function" && u(d, { success: p }));
    }, h = (d) => {
      c(d, n.useGlobalTarget || ur(l, d.target));
    }, f = (d) => {
      c(d, !1);
    };
    window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", f, i);
  };
  return s.forEach((a) => {
    !Lh(a) && a.getAttribute("tabindex") === null && (a.tabIndex = 0), (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i), a.addEventListener("focus", (u) => wh(u, i), i);
  }), r;
}
function Nh(e) {
  return e === "x" || e === "y" ? q[e] ? null : (q[e] = !0, () => {
    q[e] = !1;
  }) : q.x || q.y ? null : (q.x = q.y = !0, () => {
    q.x = q.y = !1;
  });
}
const cr = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...It
]);
let le;
function Mh() {
  le = void 0;
}
const et = {
  now: () => (le === void 0 && et.set(_.isProcessing || Lc.useManualTiming ? _.timestamp : performance.now()), le),
  set: (e) => {
    le = e, queueMicrotask(Mh);
  }
};
function Vn(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function _n(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Fn {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Vn(this.subscriptions, t), () => _n(this.subscriptions, t);
  }
  notify(t, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](t, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(t, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function hr(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Ps = 30, Dh = (e) => !isNaN(parseFloat(e));
class Vh {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(t, n = {}) {
    this.version = "12.4.2", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, i = !0) => {
      const r = et.now();
      this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = et.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Dh(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && Ee(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Fn());
    const s = this.events[t].add(n);
    return t === "change" ? () => {
      s(), w.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(t, n) : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = et.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Ps)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ps);
    return hr(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Yt(e, t) {
  return new Vh(e, t);
}
function _h(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Yt(n));
}
function Fh(e, t) {
  const n = zt(e, t);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = mh(r[o]);
    _h(e, o, a);
  }
}
function kh(e) {
  return !!($(e) && e.add);
}
function Xe(e, t) {
  const n = e.getValue("willChange");
  if (kh(n))
    return n.add(t);
}
function fr(e) {
  return e.props[Gi];
}
const dr = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, $h = 1e-7, Bh = 12;
function Uh(e, t, n, s, i) {
  let r, o, a = 0;
  do
    o = t + (n - t) / 2, r = dr(o, s, i) - e, r > 0 ? n = o : t = o;
  while (Math.abs(r) > $h && ++a < Bh);
  return o;
}
function Zt(e, t, n, s) {
  if (e === t && n === s)
    return G;
  const i = (r) => Uh(r, 0, 1, e, n);
  return (r) => r === 0 || r === 1 ? r : dr(i(r), t, s);
}
const pr = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, mr = (e) => (t) => 1 - e(1 - t), gr = /* @__PURE__ */ Zt(0.33, 1.53, 0.69, 0.99), kn = /* @__PURE__ */ mr(gr), yr = /* @__PURE__ */ pr(kn), Sr = (e) => (e *= 2) < 1 ? 0.5 * kn(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), $n = (e) => 1 - Math.sin(Math.acos(e)), vr = mr($n), Cr = pr($n), Tr = (e) => /^0[^.\s]+$/u.test(e);
function jh(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || Tr(e) : !0;
}
const $t = (e) => Math.round(e * 1e5) / 1e5, Bn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Gh(e) {
  return e == null;
}
const Kh = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Un = (e, t) => (n) => !!(typeof n == "string" && Kh.test(n) && n.startsWith(e) || t && !Gh(n) && Object.prototype.hasOwnProperty.call(n, t)), Ar = (e, t, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(Bn);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Hh = (e) => it(0, 255, e), Ne = {
  ...Nt,
  transform: (e) => Math.round(Hh(e))
}, ft = {
  test: /* @__PURE__ */ Un("rgb", "red"),
  parse: /* @__PURE__ */ Ar("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) => "rgba(" + Ne.transform(e) + ", " + Ne.transform(t) + ", " + Ne.transform(n) + ", " + $t(Wt.transform(s)) + ")"
};
function Wh(e) {
  let t = "", n = "", s = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), s = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), s = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, s += s, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Je = {
  test: /* @__PURE__ */ Un("#"),
  parse: Wh,
  transform: ft.transform
}, xt = {
  test: /* @__PURE__ */ Un("hsl", "hue"),
  parse: /* @__PURE__ */ Ar("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(e) + ", " + tt.transform($t(t)) + ", " + tt.transform($t(n)) + ", " + $t(Wt.transform(s)) + ")"
}, k = {
  test: (e) => ft.test(e) || Je.test(e) || xt.test(e),
  parse: (e) => ft.test(e) ? ft.parse(e) : xt.test(e) ? xt.parse(e) : Je.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? ft.transform(e) : xt.transform(e)
}, zh = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Yh(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(Bn)) === null || t === void 0 ? void 0 : t.length) || 0) + (((n = e.match(zh)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const xr = "number", Er = "color", qh = "var", Xh = "var(", Rs = "${}", Jh = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function qt(e) {
  const t = e.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = t.replace(Jh, (l) => (k.test(l) ? (s.color.push(r), i.push(Er), n.push(k.parse(l))) : l.startsWith(Xh) ? (s.var.push(r), i.push(qh), n.push(l)) : (s.number.push(r), i.push(xr), n.push(parseFloat(l))), ++r, Rs)).split(Rs);
  return { values: n, split: a, indexes: s, types: i };
}
function Pr(e) {
  return qt(e).values;
}
function Rr(e) {
  const { split: t, types: n } = qt(e), s = t.length;
  return (i) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (r += t[o], i[o] !== void 0) {
        const a = n[o];
        a === xr ? r += $t(i[o]) : a === Er ? r += k.transform(i[o]) : r += i[o];
      }
    return r;
  };
}
const Zh = (e) => typeof e == "number" ? 0 : e;
function Qh(e) {
  const t = Pr(e);
  return Rr(e)(t.map(Zh));
}
const lt = {
  test: Yh,
  parse: Pr,
  createTransformer: Rr,
  getAnimatableNone: Qh
}, tf = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function ef(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [s] = n.match(Bn) || [];
  if (!s)
    return e;
  const i = n.replace(s, "");
  let r = tf.has(t) ? 1 : 0;
  return s !== n && (r *= 100), t + "(" + r + i + ")";
}
const nf = /\b([a-z-]*)\(.*?\)/gu, Ze = {
  ...lt,
  getAnimatableNone: (e) => {
    const t = e.match(nf);
    return t ? t.map(ef).join(" ") : e;
  }
}, sf = {
  ...xn,
  // Color props
  color: k,
  backgroundColor: k,
  outlineColor: k,
  fill: k,
  stroke: k,
  // Border props
  borderColor: k,
  borderTopColor: k,
  borderRightColor: k,
  borderBottomColor: k,
  borderLeftColor: k,
  filter: Ze,
  WebkitFilter: Ze
}, jn = (e) => sf[e];
function Or(e, t) {
  let n = jn(e);
  return n !== Ze && (n = lt), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const rf = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function of(e, t, n) {
  let s = 0, i;
  for (; s < e.length && !i; ) {
    const r = e[s];
    typeof r == "string" && !rf.has(r) && qt(r).values.length && (i = e[s]), s++;
  }
  if (i && n)
    for (const r of t)
      e[r] = Or(n, i);
}
const Os = (e) => e === Nt || e === x, bs = (e, t) => parseFloat(e.split(", ")[t]), Ls = (e, t) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const i = s.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return bs(i[1], t);
  {
    const r = s.match(/^matrix\((.+)\)$/u);
    return r ? bs(r[1], e) : 0;
  }
}, af = /* @__PURE__ */ new Set(["x", "y", "z"]), lf = It.filter((e) => !af.has(e));
function uf(e) {
  const t = [];
  return lf.forEach((n) => {
    const s = e.getValue(n);
    s !== void 0 && (t.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const Lt = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: Ls(4, 13),
  y: Ls(5, 14)
};
Lt.translateX = Lt.x;
Lt.translateY = Lt.y;
const pt = /* @__PURE__ */ new Set();
let Qe = !1, tn = !1;
function br() {
  if (tn) {
    const e = Array.from(pt).filter((s) => s.needsMeasurement), t = new Set(e.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const i = uf(s);
      i.length && (n.set(s, i), s.render());
    }), e.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) === null || a === void 0 || a.set(o);
      });
    }), e.forEach((s) => s.measureEndState()), e.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  tn = !1, Qe = !1, pt.forEach((e) => e.complete()), pt.clear();
}
function Lr() {
  pt.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (tn = !0);
  });
}
function cf() {
  Lr(), br();
}
class Gn {
  constructor(t, n, s, i, r, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (pt.add(this), Qe || (Qe = !0, w.read(Lr), w.resolveKeyframes(br))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: s, motionValue: i } = this;
    for (let r = 0; r < t.length; r++)
      if (t[r] === null)
        if (r === 0) {
          const o = i == null ? void 0 : i.get(), a = t[t.length - 1];
          if (o !== void 0)
            t[0] = o;
          else if (s && n) {
            const l = s.readValue(n, a);
            l != null && (t[0] = l);
          }
          t[0] === void 0 && (t[0] = a), i && o === void 0 && i.set(t[0]);
        } else
          t[r] = t[r - 1];
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), pt.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, pt.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const wr = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), hf = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function ff(e) {
  const t = hf.exec(e);
  if (!t)
    return [,];
  const [, n, s, i] = t;
  return [`--${n ?? s}`, i];
}
const df = 4;
function Ir(e, t, n = 1) {
  ot(n <= df, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`);
  const [s, i] = ff(e);
  if (!s)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return wr(o) ? parseFloat(o) : o;
  }
  return An(i) ? Ir(i, t, n + 1) : i;
}
const Nr = (e) => (t) => t.test(e), pf = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Mr = [Nt, x, tt, rt, Zc, Jc, pf], ws = (e) => Mr.find(Nr(e));
class Dr extends Gn {
  constructor(t, n, s, i, r) {
    super(t, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), An(u))) {
        const c = Ir(u, n.current);
        c !== void 0 && (t[l] = c), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !cr.has(s) || t.length !== 2)
      return;
    const [i, r] = t, o = ws(i), a = ws(r);
    if (o !== a)
      if (Os(o) && Os(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, s = [];
    for (let i = 0; i < t.length; i++)
      jh(t[i]) && s.push(i);
    s.length && of(t, s, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: s } = this;
    if (!t || !t.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Lt[s](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: s, unresolvedKeyframes: i } = this;
    if (!n || !n.current)
      return;
    const r = n.getValue(s);
    r && r.jump(this.measuredOrigin, !1);
    const o = i.length - 1, a = i[o];
    i[o] = Lt[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((t = this.removedTransforms) === null || t === void 0) && t.length && this.removedTransforms.forEach(([l, u]) => {
      n.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const Is = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(lt.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function mf(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function gf(e, t, n, s) {
  const i = e[0];
  if (i === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = e[e.length - 1], o = Is(i, t), a = Is(r, t);
  return wt(o === a, `You are trying to animate ${t} from "${i}" to "${r}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${r} via the \`style\` property.`), !o || !a ? !1 : mf(e) || (n === "spring" || Nn(n)) && s;
}
const yf = (e) => e !== null;
function be(e, { repeat: t, repeatType: n = "loop" }, s) {
  const i = e.filter(yf), r = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !r || s === void 0 ? i[r] : s;
}
const Sf = 40;
class Vr {
  constructor({ autoplay: t = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = et.now(), this.options = {
      autoplay: t,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      ...a
    }, this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Sf ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && cf(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(t, n) {
    this.resolvedAt = et.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: i, velocity: r, delay: o, onComplete: a, onUpdate: l, isGenerator: u } = this.options;
    if (!u && !gf(t, s, i, r))
      if (o)
        this.options.duration = 0;
      else {
        l && l(be(t, this.options, n)), a && a(), this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(t, n);
    c !== !1 && (this._resolved = {
      keyframes: t,
      finalKeyframe: n,
      ...c
    }, this.onPostResolved());
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  flatten() {
    this.options.type = "keyframes", this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
const N = (e, t, n) => e + (t - e) * n;
function Me(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function vf({ hue: e, saturation: t, lightness: n, alpha: s }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!t)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    i = Me(l, a, e + 1 / 3), r = Me(l, a, e), o = Me(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function ye(e, t) {
  return (n) => n > 0 ? t : e;
}
const De = (e, t, n) => {
  const s = e * e, i = n * (t * t - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Cf = [Je, ft, xt], Tf = (e) => Cf.find((t) => t.test(e));
function Ns(e) {
  const t = Tf(e);
  if (wt(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`), !t)
    return !1;
  let n = t.parse(e);
  return t === xt && (n = vf(n)), n;
}
const Ms = (e, t) => {
  const n = Ns(e), s = Ns(t);
  if (!n || !s)
    return ye(e, t);
  const i = { ...n };
  return (r) => (i.red = De(n.red, s.red, r), i.green = De(n.green, s.green, r), i.blue = De(n.blue, s.blue, r), i.alpha = N(n.alpha, s.alpha, r), ft.transform(i));
}, Af = (e, t) => (n) => t(e(n)), Qt = (...e) => e.reduce(Af), en = /* @__PURE__ */ new Set(["none", "hidden"]);
function xf(e, t) {
  return en.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Ef(e, t) {
  return (n) => N(e, t, n);
}
function Kn(e) {
  return typeof e == "number" ? Ef : typeof e == "string" ? An(e) ? ye : k.test(e) ? Ms : Of : Array.isArray(e) ? _r : typeof e == "object" ? k.test(e) ? Ms : Pf : ye;
}
function _r(e, t) {
  const n = [...e], s = n.length, i = e.map((r, o) => Kn(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function Pf(e, t) {
  const n = { ...e, ...t }, s = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (s[i] = Kn(e[i])(e[i], t[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function Rf(e, t) {
  var n;
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < t.values.length; r++) {
    const o = t.types[r], a = e.indexes[o][i[o]], l = (n = e.values[a]) !== null && n !== void 0 ? n : 0;
    s[r] = l, i[o]++;
  }
  return s;
}
const Of = (e, t) => {
  const n = lt.createTransformer(t), s = qt(e), i = qt(t);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? en.has(e) && !i.values.length || en.has(t) && !s.values.length ? xf(e, t) : Qt(_r(Rf(s, i), i.values), n) : (wt(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), ye(e, t));
};
function Fr(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? N(e, t, n) : Kn(e)(e, t);
}
const bf = 5;
function kr(e, t, n) {
  const s = Math.max(t - bf, 0);
  return hr(n - e(s), t - s);
}
const I = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Ve = 1e-3;
function Lf({ duration: e = I.duration, bounce: t = I.bounce, velocity: n = I.velocity, mass: s = I.mass }) {
  let i, r;
  wt(e <= /* @__PURE__ */ Q(I.maxDuration), "Spring duration must be 10 seconds or less");
  let o = 1 - t;
  o = it(I.minDamping, I.maxDamping, o), e = it(I.minDuration, I.maxDuration, /* @__PURE__ */ nt(e)), o < 1 ? (i = (u) => {
    const c = u * o, h = c * e, f = c - n, d = nn(u, o), p = Math.exp(-h);
    return Ve - f / d * p;
  }, r = (u) => {
    const h = u * o * e, f = h * n + n, d = Math.pow(o, 2) * Math.pow(u, 2) * e, p = Math.exp(-h), m = nn(Math.pow(u, 2), o);
    return (-i(u) + Ve > 0 ? -1 : 1) * ((f - d) * p) / m;
  }) : (i = (u) => {
    const c = Math.exp(-u * e), h = (u - n) * e + 1;
    return -Ve + c * h;
  }, r = (u) => {
    const c = Math.exp(-u * e), h = (n - u) * (e * e);
    return c * h;
  });
  const a = 5 / e, l = If(i, r, a);
  if (e = /* @__PURE__ */ Q(e), isNaN(l))
    return {
      stiffness: I.stiffness,
      damping: I.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * s;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(s * u),
      duration: e
    };
  }
}
const wf = 12;
function If(e, t, n) {
  let s = n;
  for (let i = 1; i < wf; i++)
    s = s - e(s) / t(s);
  return s;
}
function nn(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Nf = ["duration", "bounce"], Mf = ["stiffness", "damping", "mass"];
function Ds(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Df(e) {
  let t = {
    velocity: I.velocity,
    stiffness: I.stiffness,
    damping: I.damping,
    mass: I.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Ds(e, Mf) && Ds(e, Nf))
    if (e.visualDuration) {
      const n = e.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * it(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = {
        ...t,
        mass: I.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = Lf(e);
      t = {
        ...t,
        ...n,
        mass: I.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function $r(e = I.visualDuration, t = I.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: c, duration: h, velocity: f, isResolvedFromDuration: d } = Df({
    ...n,
    velocity: -/* @__PURE__ */ nt(n.velocity || 0)
  }), p = f || 0, m = u / (2 * Math.sqrt(l * c)), g = o - r, y = /* @__PURE__ */ nt(Math.sqrt(l / c)), S = Math.abs(g) < 5;
  s || (s = S ? I.restSpeed.granular : I.restSpeed.default), i || (i = S ? I.restDelta.granular : I.restDelta.default);
  let v;
  if (m < 1) {
    const T = nn(y, m);
    v = (A) => {
      const R = Math.exp(-m * y * A);
      return o - R * ((p + m * y * g) / T * Math.sin(T * A) + g * Math.cos(T * A));
    };
  } else if (m === 1)
    v = (T) => o - Math.exp(-y * T) * (g + (p + y * g) * T);
  else {
    const T = y * Math.sqrt(m * m - 1);
    v = (A) => {
      const R = Math.exp(-m * y * A), C = Math.min(T * A, 300);
      return o - R * ((p + m * y * g) * Math.sinh(C) + T * g * Math.cosh(C)) / T;
    };
  }
  const E = {
    calculatedDuration: d && h || null,
    next: (T) => {
      const A = v(T);
      if (d)
        a.done = T >= h;
      else {
        let R = 0;
        m < 1 && (R = T === 0 ? /* @__PURE__ */ Q(p) : kr(v, T, A));
        const C = Math.abs(R) <= s, O = Math.abs(o - A) <= i;
        a.done = C && O;
      }
      return a.value = a.done ? o : A, a;
    },
    toString: () => {
      const T = Math.min(sr(E), Ye), A = ir((R) => E.next(T * R).value, T, 30);
      return T + "ms " + A;
    }
  };
  return E;
}
function Vs({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = e[0], f = {
    done: !1,
    value: h
  }, d = (C) => a !== void 0 && C < a || l !== void 0 && C > l, p = (C) => a === void 0 ? l : l === void 0 || Math.abs(a - C) < Math.abs(l - C) ? a : l;
  let m = n * t;
  const g = h + m, y = o === void 0 ? g : o(g);
  y !== g && (m = y - h);
  const S = (C) => -m * Math.exp(-C / s), v = (C) => y + S(C), E = (C) => {
    const O = S(C), b = v(C);
    f.done = Math.abs(O) <= u, f.value = f.done ? y : b;
  };
  let T, A;
  const R = (C) => {
    d(f.value) && (T = C, A = $r({
      keyframes: [f.value, p(f.value)],
      velocity: kr(v, C, f.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: u,
      restSpeed: c
    }));
  };
  return R(0), {
    calculatedDuration: null,
    next: (C) => {
      let O = !1;
      return !A && T === void 0 && (O = !0, E(C), R(C)), T !== void 0 && C >= T ? A.next(C - T) : (!O && E(C), f);
    }
  };
}
const Vf = /* @__PURE__ */ Zt(0.42, 0, 1, 1), _f = /* @__PURE__ */ Zt(0, 0, 0.58, 1), Br = /* @__PURE__ */ Zt(0.42, 0, 0.58, 1), Ff = (e) => Array.isArray(e) && typeof e[0] != "number", _s = {
  linear: G,
  easeIn: Vf,
  easeInOut: Br,
  easeOut: _f,
  circIn: $n,
  circInOut: Cr,
  circOut: vr,
  backIn: kn,
  backInOut: yr,
  backOut: gr,
  anticipate: Sr
}, Fs = (e) => {
  if (Mn(e)) {
    ot(e.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [t, n, s, i] = e;
    return Zt(t, n, s, i);
  } else if (typeof e == "string")
    return ot(_s[e] !== void 0, `Invalid easing type '${e}'`), _s[e];
  return e;
};
function kf(e, t, n) {
  const s = [], i = n || Fr, r = e.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || G : t;
      a = Qt(l, a);
    }
    s.push(a);
  }
  return s;
}
function $f(e, t, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = e.length;
  if (ot(r === t.length, "Both input and output ranges must be the same length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[r - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = kf(t, s, i), l = a.length, u = (c) => {
    if (o && c < e[0])
      return t[0];
    let h = 0;
    if (l > 1)
      for (; h < e.length - 2 && !(c < e[h + 1]); h++)
        ;
    const f = /* @__PURE__ */ Ot(e[h], e[h + 1], c);
    return a[h](f);
  };
  return n ? (c) => u(it(e[0], e[r - 1], c)) : u;
}
function Bf(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const i = /* @__PURE__ */ Ot(0, t, s);
    e.push(N(n, 1, i));
  }
}
function Uf(e) {
  const t = [0];
  return Bf(t, e.length - 1), t;
}
function jf(e, t) {
  return e.map((n) => n * t);
}
function Gf(e, t) {
  return e.map(() => t || Br).splice(0, e.length - 1);
}
function Se({ duration: e = 300, keyframes: t, times: n, ease: s = "easeInOut" }) {
  const i = Ff(s) ? s.map(Fs) : Fs(s), r = {
    done: !1,
    value: t[0]
  }, o = jf(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : Uf(t),
    e
  ), a = $f(o, t, {
    ease: Array.isArray(i) ? i : Gf(t, i)
  });
  return {
    calculatedDuration: e,
    next: (l) => (r.value = a(l), r.done = l >= e, r)
  };
}
const Kf = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: () => w.update(t, !0),
    stop: () => at(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _.isProcessing ? _.timestamp : et.now()
  };
}, Hf = {
  decay: Vs,
  inertia: Vs,
  tween: Se,
  keyframes: Se,
  spring: $r
}, Wf = (e) => e / 100;
class Hn extends Vr {
  constructor(t) {
    super(t), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options, o = (i == null ? void 0 : i.KeyframeResolver) || Gn, a = (l, u) => this.onKeyframesResolved(l, u);
    this.resolver = new o(r, a, n, s, i), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(t) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = this.options, a = Nn(n) ? n : Hf[n] || Se;
    let l, u;
    a !== Se && typeof t[0] != "number" && (process.env.NODE_ENV !== "production" && ot(t.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${t}`), l = Qt(Wf, Fr(t[0], t[1])), t = [0, 100]);
    const c = a({ ...this.options, keyframes: t });
    r === "mirror" && (u = a({
      ...this.options,
      keyframes: [...t].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = sr(c));
    const { calculatedDuration: h } = c, f = h + i, d = f * (s + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: l,
      calculatedDuration: h,
      resolvedDuration: f,
      totalDuration: d
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(), this.pendingPlayState === "paused" || !t ? this.pause() : this.state = this.pendingPlayState;
  }
  tick(t, n = !1) {
    const { resolved: s } = this;
    if (!s) {
      const { keyframes: C } = this.options;
      return { done: !0, value: C[C.length - 1] };
    }
    const { finalKeyframe: i, generator: r, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: u, totalDuration: c, resolvedDuration: h } = s;
    if (this.startTime === null)
      return r.next(0);
    const { delay: f, repeat: d, repeatType: p, repeatDelay: m, onUpdate: g } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - c / this.speed, this.startTime)), n ? this.currentTime = t : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(t - this.startTime) * this.speed;
    const y = this.currentTime - f * (this.speed >= 0 ? 1 : -1), S = this.speed >= 0 ? y < 0 : y > c;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let v = this.currentTime, E = r;
    if (d) {
      const C = Math.min(this.currentTime, c) / h;
      let O = Math.floor(C), b = C % 1;
      !b && C >= 1 && (b = 1), b === 1 && O--, O = Math.min(O, d + 1), !!(O % 2) && (p === "reverse" ? (b = 1 - b, m && (b -= m / h)) : p === "mirror" && (E = o)), v = it(0, 1, b) * h;
    }
    const T = S ? { done: !1, value: l[0] } : E.next(v);
    a && (T.value = a(T.value));
    let { done: A } = T;
    !S && u !== null && (A = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const R = this.holdTime === null && (this.state === "finished" || this.state === "running" && A);
    return R && i !== void 0 && (T.value = be(l, this.options, i)), g && g(T.value), R && this.finish(), T;
  }
  get duration() {
    const { resolved: t } = this;
    return t ? /* @__PURE__ */ nt(t.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ nt(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ Q(t), this.currentTime = t, this.holdTime !== null || this.speed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ nt(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: t = Kf, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = t((r) => this.tick(r))), n && n();
    const i = this.driver.now();
    this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime ? this.state === "finished" && (this.startTime = i) : this.startTime = s ?? this.calcStartTime(), this.state === "finished" && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused", this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0;
  }
  complete() {
    this.state !== "running" && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.teardown(), this.state = "finished";
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this.startTime = this.cancelTime = null, this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
}
const zf = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function Yf(e, t, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const u = { [t]: n };
  l && (u.offset = l);
  const c = or(a, i);
  return Array.isArray(c) && (u.easing = c), e.animate(u, {
    delay: s,
    duration: i,
    easing: Array.isArray(c) ? "linear" : c,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const qf = /* @__PURE__ */ gn(() => Object.hasOwnProperty.call(Element.prototype, "animate")), ve = 10, Xf = 2e4;
function Jf(e) {
  return Nn(e.type) || e.type === "spring" || !rr(e.ease);
}
function Zf(e, t) {
  const n = new Hn({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: e[0] };
  const i = [];
  let r = 0;
  for (; !s.done && r < Xf; )
    s = n.sample(r), i.push(s.value), r += ve;
  return {
    times: void 0,
    keyframes: i,
    duration: r - ve,
    ease: "linear"
  };
}
const Ur = {
  anticipate: Sr,
  backInOut: yr,
  circInOut: Cr
};
function Qf(e) {
  return e in Ur;
}
class ks extends Vr {
  constructor(t) {
    super(t);
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options;
    this.resolver = new Dr(r, (o, a) => this.onKeyframesResolved(o, a), n, s, i), this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    let { duration: s = 300, times: i, ease: r, type: o, motionValue: a, name: l, startTime: u } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof r == "string" && ge() && Qf(r) && (r = Ur[r]), Jf(this.options)) {
      const { onComplete: h, onUpdate: f, motionValue: d, element: p, ...m } = this.options, g = Zf(t, m);
      t = g.keyframes, t.length === 1 && (t[1] = t[0]), s = g.duration, i = g.times, r = g.ease, o = "keyframes";
    }
    const c = Yf(a.owner.current, l, t, { ...this.options, duration: s, times: i, ease: r });
    return c.startTime = u ?? this.calcStartTime(), this.pendingTimeline ? (Ts(c, this.pendingTimeline), this.pendingTimeline = void 0) : c.onfinish = () => {
      const { onComplete: h } = this.options;
      a.set(be(t, this.options, n)), h && h(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: c,
      duration: s,
      times: i,
      type: o,
      ease: r,
      keyframes: t
    };
  }
  get duration() {
    const { resolved: t } = this;
    if (!t)
      return 0;
    const { duration: n } = t;
    return /* @__PURE__ */ nt(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t)
      return 0;
    const { animation: n } = t;
    return /* @__PURE__ */ nt(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.currentTime = /* @__PURE__ */ Q(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t)
      return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t)
      return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  get startTime() {
    const { resolved: t } = this;
    if (!t)
      return null;
    const { animation: n } = t;
    return n.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(t) {
    if (!this._resolved)
      this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n)
        return G;
      const { animation: s } = n;
      Ts(s, t);
    }
    return G;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: t } = this;
    if (!t)
      return;
    const { animation: n, keyframes: s, duration: i, type: r, ease: o, times: a } = t;
    if (n.playState === "idle" || n.playState === "finished")
      return;
    if (this.time) {
      const { motionValue: u, onUpdate: c, onComplete: h, element: f, ...d } = this.options, p = new Hn({
        ...d,
        keyframes: s,
        duration: i,
        type: r,
        ease: o,
        times: a,
        isGenerator: !0
      }), m = /* @__PURE__ */ Q(this.time);
      u.setWithVelocity(p.sample(m - ve).value, p.sample(m).value, ve);
    }
    const { onStop: l } = this.options;
    l && l(), this.cancel();
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const { motionValue: n, name: s, repeatDelay: i, repeatType: r, damping: o, type: a } = t;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement))
      return !1;
    const { onUpdate: l, transformTemplate: u } = n.owner.getProps();
    return qf() && s && zf.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !u && !i && r !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const td = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, ed = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), nd = {
  type: "keyframes",
  duration: 0.8
}, sd = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, id = (e, { keyframes: t }) => t.length > 2 ? nd : St.has(e) ? e.startsWith("scale") ? ed(t[1]) : td : sd;
function rd({ when: e, delay: t, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const Wn = (e, t, n, s = {}, i, r) => (o) => {
  const a = In(s, e) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - /* @__PURE__ */ Q(l);
  let c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      t.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: r ? void 0 : i
  };
  rd(a) || (c = {
    ...c,
    ...id(e, c)
  }), c.duration && (c.duration = /* @__PURE__ */ Q(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Q(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (c.duration = 0, c.delay === 0 && (h = !0)), h && !r && t.get() !== void 0) {
    const f = be(c.keyframes, a);
    if (f !== void 0)
      return w.update(() => {
        c.onUpdate(f), c.onComplete();
      }), new xh([]);
  }
  return !r && ks.supports(c) ? new ks(c) : new Hn(c);
};
function od({ protectedKeys: e, needsAnimating: t }, n) {
  const s = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, s;
}
function jr(e, t, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var r;
  let { transition: o = e.getDefaultTransition(), transitionEnd: a, ...l } = t;
  s && (o = s);
  const u = [], c = i && e.animationState && e.animationState.getState()[i];
  for (const h in l) {
    const f = e.getValue(h, (r = e.latestValues[h]) !== null && r !== void 0 ? r : null), d = l[h];
    if (d === void 0 || c && od(c, h))
      continue;
    const p = {
      delay: n,
      ...In(o || {}, h)
    };
    let m = !1;
    if (window.MotionHandoffAnimation) {
      const y = fr(e);
      if (y) {
        const S = window.MotionHandoffAnimation(y, h, w);
        S !== null && (p.startTime = S, m = !0);
      }
    }
    Xe(e, h), f.start(Wn(h, f, d, e.shouldReduceMotion && cr.has(h) ? { type: !1 } : p, e, m));
    const g = f.animation;
    g && u.push(g);
  }
  return a && Promise.all(u).then(() => {
    w.update(() => {
      a && Fh(e, a);
    });
  }), u;
}
function sn(e, t, n = {}) {
  var s;
  const i = zt(e, t, n.type === "exit" ? (s = e.presenceContext) === null || s === void 0 ? void 0 : s.custom : void 0);
  let { transition: r = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (r = n.transitionOverride);
  const o = i ? () => Promise.all(jr(e, i, n)) : () => Promise.resolve(), a = e.variantChildren && e.variantChildren.size ? (u = 0) => {
    const { delayChildren: c = 0, staggerChildren: h, staggerDirection: f } = r;
    return ad(e, t, c + u, h, f, n);
  } : () => Promise.resolve(), { when: l } = r;
  if (l) {
    const [u, c] = l === "beforeChildren" ? [o, a] : [a, o];
    return u().then(() => c());
  } else
    return Promise.all([o(), a(n.delay)]);
}
function ad(e, t, n = 0, s = 0, i = 1, r) {
  const o = [], a = (e.variantChildren.size - 1) * s, l = i === 1 ? (u = 0) => u * s : (u = 0) => a - u * s;
  return Array.from(e.variantChildren).sort(ld).forEach((u, c) => {
    u.notify("AnimationStart", t), o.push(sn(u, t, {
      ...r,
      delay: n + l(c)
    }).then(() => u.notify("AnimationComplete", t)));
  }), Promise.all(o);
}
function ld(e, t) {
  return e.sortNodePosition(t);
}
function ud(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let s;
  if (Array.isArray(t)) {
    const i = t.map((r) => sn(e, r, n));
    s = Promise.all(i);
  } else if (typeof t == "string")
    s = sn(e, t, n);
  else {
    const i = typeof t == "function" ? zt(e, t, n.custom) : t;
    s = Promise.all(jr(e, i, n));
  }
  return s.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function Gr(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (t[s] !== e[s])
      return !1;
  return !0;
}
const cd = Sn.length;
function Kr(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? Kr(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < cd; n++) {
    const s = Sn[n], i = e.props[s];
    (Kt(i) || i === !1) && (t[s] = i);
  }
  return t;
}
const hd = [...yn].reverse(), fd = yn.length;
function dd(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: s }) => ud(e, n, s)));
}
function pd(e) {
  let t = dd(e), n = $s(), s = !0;
  const i = (l) => (u, c) => {
    var h;
    const f = zt(e, c, l === "exit" ? (h = e.presenceContext) === null || h === void 0 ? void 0 : h.custom : void 0);
    if (f) {
      const { transition: d, transitionEnd: p, ...m } = f;
      u = { ...u, ...m, ...p };
    }
    return u;
  };
  function r(l) {
    t = l(e);
  }
  function o(l) {
    const { props: u } = e, c = Kr(e.parent) || {}, h = [], f = /* @__PURE__ */ new Set();
    let d = {}, p = 1 / 0;
    for (let g = 0; g < fd; g++) {
      const y = hd[g], S = n[y], v = u[y] !== void 0 ? u[y] : c[y], E = Kt(v), T = y === l ? S.isActive : null;
      T === !1 && (p = g);
      let A = v === c[y] && v !== u[y] && E;
      if (A && s && e.manuallyAnimateOnMount && (A = !1), S.protectedKeys = { ...d }, // If it isn't active and hasn't *just* been set as inactive
      !S.isActive && T === null || // If we didn't and don't have any defined prop for this animation type
      !v && !S.prevProp || // Or if the prop doesn't define an animation
      Re(v) || typeof v == "boolean")
        continue;
      const R = md(S.prevProp, v);
      let C = R || // If we're making this variant active, we want to always make it active
      y === l && S.isActive && !A && E || // If we removed a higher-priority variant (i is in reverse order)
      g > p && E, O = !1;
      const b = Array.isArray(v) ? v : [v];
      let L = b.reduce(i(y), {});
      T === !1 && (L = {});
      const { prevResolvedValues: j = {} } = S, ee = {
        ...j,
        ...L
      }, K = (D) => {
        C = !0, f.has(D) && (O = !0, f.delete(D)), S.needsAnimating[D] = !0;
        const H = e.getValue(D);
        H && (H.liveStyle = !1);
      };
      for (const D in ee) {
        const H = L[D], V = j[D];
        if (d.hasOwnProperty(D))
          continue;
        let Y = !1;
        ze(H) && ze(V) ? Y = !Gr(H, V) : Y = H !== V, Y ? H != null ? K(D) : f.add(D) : H !== void 0 && f.has(D) ? K(D) : S.protectedKeys[D] = !0;
      }
      S.prevProp = v, S.prevResolvedValues = L, S.isActive && (d = { ...d, ...L }), s && e.blockInitialAnimation && (C = !1), C && (!(A && R) || O) && h.push(...b.map((D) => ({
        animation: D,
        options: { type: y }
      })));
    }
    if (f.size) {
      const g = {};
      if (typeof u.initial != "boolean") {
        const y = zt(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        y && y.transition && (g.transition = y.transition);
      }
      f.forEach((y) => {
        const S = e.getBaseTarget(y), v = e.getValue(y);
        v && (v.liveStyle = !0), g[y] = S ?? null;
      }), h.push({ animation: g });
    }
    let m = !!h.length;
    return s && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (m = !1), s = !1, m ? t(h) : Promise.resolve();
  }
  function a(l, u) {
    var c;
    if (n[l].isActive === u)
      return Promise.resolve();
    (c = e.variantChildren) === null || c === void 0 || c.forEach((f) => {
      var d;
      return (d = f.animationState) === null || d === void 0 ? void 0 : d.setActive(l, u);
    }), n[l].isActive = u;
    const h = o(l);
    for (const f in n)
      n[f].protectedKeys = {};
    return h;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: r,
    getState: () => n,
    reset: () => {
      n = $s(), s = !0;
    }
  };
}
function md(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Gr(t, e) : !1;
}
function ct(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function $s() {
  return {
    animate: ct(!0),
    whileInView: ct(),
    whileHover: ct(),
    whileTap: ct(),
    whileDrag: ct(),
    whileFocus: ct(),
    exit: ct()
  };
}
class ut {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
class gd extends ut {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = pd(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Re(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(), (t = this.unmountControls) === null || t === void 0 || t.call(this);
  }
}
let yd = 0;
class Sd extends ut {
  constructor() {
    super(...arguments), this.id = yd++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === s)
      return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const vd = {
  animation: {
    Feature: gd
  },
  exit: {
    Feature: Sd
  }
};
function Xt(e, t, n, s = { passive: !0 }) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n);
}
function te(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const Cd = (e) => (t) => Dn(t) && e(t, te(t));
function Bt(e, t, n, s) {
  return Xt(e, t, Cd(n), s);
}
const Bs = (e, t) => Math.abs(e - t);
function Td(e, t) {
  const n = Bs(e.x, t.x), s = Bs(e.y, t.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
class Hr {
  constructor(t, n, { transformPagePoint: s, contextWindow: i, dragSnapToOrigin: r = !1 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const h = Fe(this.lastMoveEventInfo, this.history), f = this.startEvent !== null, d = Td(h.offset, { x: 0, y: 0 }) >= 3;
      if (!f && !d)
        return;
      const { point: p } = h, { timestamp: m } = _;
      this.history.push({ ...p, timestamp: m });
      const { onStart: g, onMove: y } = this.handlers;
      f || (g && g(this.lastMoveEvent, h), this.startEvent = this.lastMoveEvent), y && y(this.lastMoveEvent, h);
    }, this.handlePointerMove = (h, f) => {
      this.lastMoveEvent = h, this.lastMoveEventInfo = _e(f, this.transformPagePoint), w.update(this.updatePoint, !0);
    }, this.handlePointerUp = (h, f) => {
      this.end();
      const { onEnd: d, onSessionEnd: p, resumeAnimation: m } = this.handlers;
      if (this.dragSnapToOrigin && m && m(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const g = Fe(h.type === "pointercancel" ? this.lastMoveEventInfo : _e(f, this.transformPagePoint), this.history);
      this.startEvent && d && d(h, g), p && p(h, g);
    }, !Dn(t))
      return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = s, this.contextWindow = i || window;
    const o = te(t), a = _e(o, this.transformPagePoint), { point: l } = a, { timestamp: u } = _;
    this.history = [{ ...l, timestamp: u }];
    const { onSessionStart: c } = n;
    c && c(t, Fe(a, this.history)), this.removeListeners = Qt(Bt(this.contextWindow, "pointermove", this.handlePointerMove), Bt(this.contextWindow, "pointerup", this.handlePointerUp), Bt(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), at(this.updatePoint);
  }
}
function _e(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Us(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Fe({ point: e }, t) {
  return {
    point: e,
    delta: Us(e, Wr(t)),
    offset: Us(e, Ad(t)),
    velocity: xd(t, 0.1)
  };
}
function Ad(e) {
  return e[0];
}
function Wr(e) {
  return e[e.length - 1];
}
function xd(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, s = null;
  const i = Wr(e);
  for (; n >= 0 && (s = e[n], !(i.timestamp - s.timestamp > /* @__PURE__ */ Q(t))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  const r = /* @__PURE__ */ nt(i.timestamp - s.timestamp);
  if (r === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (i.x - s.x) / r,
    y: (i.y - s.y) / r
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
const zr = 1e-4, Ed = 1 - zr, Pd = 1 + zr, Yr = 0.01, Rd = 0 - Yr, Od = 0 + Yr;
function U(e) {
  return e.max - e.min;
}
function bd(e, t, n) {
  return Math.abs(e - t) <= n;
}
function js(e, t, n, s = 0.5) {
  e.origin = s, e.originPoint = N(t.min, t.max, e.origin), e.scale = U(n) / U(t), e.translate = N(n.min, n.max, e.origin) - e.originPoint, (e.scale >= Ed && e.scale <= Pd || isNaN(e.scale)) && (e.scale = 1), (e.translate >= Rd && e.translate <= Od || isNaN(e.translate)) && (e.translate = 0);
}
function Ut(e, t, n, s) {
  js(e.x, t.x, n.x, s ? s.originX : void 0), js(e.y, t.y, n.y, s ? s.originY : void 0);
}
function Gs(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + U(t);
}
function Ld(e, t, n) {
  Gs(e.x, t.x, n.x), Gs(e.y, t.y, n.y);
}
function Ks(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + U(t);
}
function jt(e, t, n) {
  Ks(e.x, t.x, n.x), Ks(e.y, t.y, n.y);
}
function wd(e, { min: t, max: n }, s) {
  return t !== void 0 && e < t ? e = s ? N(t, e, s.min) : Math.max(e, t) : n !== void 0 && e > n && (e = s ? N(n, e, s.max) : Math.min(e, n)), e;
}
function Hs(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function Id(e, { top: t, left: n, bottom: s, right: i }) {
  return {
    x: Hs(e.x, n, i),
    y: Hs(e.y, t, s)
  };
}
function Ws(e, t) {
  let n = t.min - e.min, s = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Nd(e, t) {
  return {
    x: Ws(e.x, t.x),
    y: Ws(e.y, t.y)
  };
}
function Md(e, t) {
  let n = 0.5;
  const s = U(e), i = U(t);
  return i > s ? n = /* @__PURE__ */ Ot(t.min, t.max - s, e.min) : s > i && (n = /* @__PURE__ */ Ot(e.min, e.max - i, t.min)), it(0, 1, n);
}
function Dd(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const rn = 0.35;
function Vd(e = rn) {
  return e === !1 ? e = 0 : e === !0 && (e = rn), {
    x: zs(e, "left", "right"),
    y: zs(e, "top", "bottom")
  };
}
function zs(e, t, n) {
  return {
    min: Ys(e, t),
    max: Ys(e, n)
  };
}
function Ys(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const qs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Et = () => ({
  x: qs(),
  y: qs()
}), Xs = () => ({ min: 0, max: 0 }), M = () => ({
  x: Xs(),
  y: Xs()
});
function z(e) {
  return [e("x"), e("y")];
}
function qr({ top: e, left: t, right: n, bottom: s }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: s }
  };
}
function _d({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Fd(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), s = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function ke(e) {
  return e === void 0 || e === 1;
}
function on({ scale: e, scaleX: t, scaleY: n }) {
  return !ke(e) || !ke(t) || !ke(n);
}
function ht(e) {
  return on(e) || Xr(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Xr(e) {
  return Js(e.x) || Js(e.y);
}
function Js(e) {
  return e && e !== "0%";
}
function Ce(e, t, n) {
  const s = e - n, i = t * s;
  return n + i;
}
function Zs(e, t, n, s, i) {
  return i !== void 0 && (e = Ce(e, i, s)), Ce(e, n, s) + t;
}
function an(e, t = 0, n = 1, s, i) {
  e.min = Zs(e.min, t, n, s, i), e.max = Zs(e.max, t, n, s, i);
}
function Jr(e, { x: t, y: n }) {
  an(e.x, t.translate, t.scale, t.originPoint), an(e.y, n.translate, n.scale, n.originPoint);
}
const Qs = 0.999999999999, ti = 1.0000000000001;
function kd(e, t, n, s = !1) {
  const i = n.length;
  if (!i)
    return;
  t.x = t.y = 1;
  let r, o;
  for (let a = 0; a < i; a++) {
    r = n[a], o = r.projectionDelta;
    const { visualElement: l } = r.options;
    l && l.props.style && l.props.style.display === "contents" || (s && r.options.layoutScroll && r.scroll && r !== r.root && Rt(e, {
      x: -r.scroll.offset.x,
      y: -r.scroll.offset.y
    }), o && (t.x *= o.x.scale, t.y *= o.y.scale, Jr(e, o)), s && ht(r.latestValues) && Rt(e, r.latestValues));
  }
  t.x < ti && t.x > Qs && (t.x = 1), t.y < ti && t.y > Qs && (t.y = 1);
}
function Pt(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function ei(e, t, n, s, i = 0.5) {
  const r = N(e.min, e.max, i);
  an(e, t, n, r, s);
}
function Rt(e, t) {
  ei(e.x, t.x, t.scaleX, t.scale, t.originX), ei(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function Zr(e, t) {
  return qr(Fd(e.getBoundingClientRect(), t));
}
function $d(e, t, n) {
  const s = Zr(e, n), { scroll: i } = t;
  return i && (Pt(s.x, i.offset.x), Pt(s.y, i.offset.y)), s;
}
const Qr = ({ current: e }) => e ? e.ownerDocument.defaultView : null, Bd = /* @__PURE__ */ new WeakMap();
class Ud {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = M(), this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const i = (c) => {
      const { dragSnapToOrigin: h } = this.getProps();
      h ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(te(c).point);
    }, r = (c, h) => {
      const { drag: f, dragPropagation: d, onDragStart: p } = this.getProps();
      if (f && !d && (this.openDragLock && this.openDragLock(), this.openDragLock = Nh(f), !this.openDragLock))
        return;
      this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), z((g) => {
        let y = this.getAxisMotionValue(g).get() || 0;
        if (tt.test(y)) {
          const { projection: S } = this.visualElement;
          if (S && S.layout) {
            const v = S.layout.layoutBox[g];
            v && (y = U(v) * (parseFloat(y) / 100));
          }
        }
        this.originPoint[g] = y;
      }), p && w.postRender(() => p(c, h)), Xe(this.visualElement, "transform");
      const { animationState: m } = this.visualElement;
      m && m.setActive("whileDrag", !0);
    }, o = (c, h) => {
      const { dragPropagation: f, dragDirectionLock: d, onDirectionLock: p, onDrag: m } = this.getProps();
      if (!f && !this.openDragLock)
        return;
      const { offset: g } = h;
      if (d && this.currentDirection === null) {
        this.currentDirection = jd(g), this.currentDirection !== null && p && p(this.currentDirection);
        return;
      }
      this.updateAxis("x", h.point, g), this.updateAxis("y", h.point, g), this.visualElement.render(), m && m(c, h);
    }, a = (c, h) => this.stop(c, h), l = () => z((c) => {
      var h;
      return this.getAnimationState(c) === "paused" && ((h = this.getAxisMotionValue(c).animation) === null || h === void 0 ? void 0 : h.play());
    }), { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new Hr(t, {
      onSessionStart: i,
      onStart: r,
      onMove: o,
      onSessionEnd: a,
      resumeAnimation: l
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: u,
      contextWindow: Qr(this.visualElement)
    });
  }
  stop(t, n) {
    const s = this.isDragging;
    if (this.cancel(), !s)
      return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: r } = this.getProps();
    r && w.postRender(() => r(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !oe(t, i, this.currentDirection))
      return;
    const r = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + s[t];
    this.constraints && this.constraints[t] && (o = wd(o, this.constraints[t], this.elastic[t])), r.set(o);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: s } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (t = this.visualElement.projection) === null || t === void 0 ? void 0 : t.layout, r = this.constraints;
    n && At(n) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : n && i ? this.constraints = Id(i.layoutBox, n) : this.constraints = !1, this.elastic = Vd(s), r !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && z((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Dd(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !At(t))
      return !1;
    const s = t.current;
    ot(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    const r = $d(s, i.root, this.visualElement.getTransformPagePoint());
    let o = Nd(i.layout.layoutBox, r);
    if (n) {
      const a = n(_d(o));
      this.hasMutatedConstraints = !!a, a && (o = qr(a));
    }
    return o;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = z((c) => {
      if (!oe(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      o && (h = { min: 0, max: 0 });
      const f = i ? 200 : 1e6, d = i ? 40 : 1e7, p = {
        type: "inertia",
        velocity: s ? t[c] : 0,
        bounceStiffness: f,
        bounceDamping: d,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...r,
        ...h
      };
      return this.startAxisValueAnimation(c, p);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const s = this.getAxisMotionValue(t);
    return Xe(this.visualElement, t), s.start(Wn(t, s, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    z((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    z((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0 ? void 0 : n.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, s = this.visualElement.getProps(), i = s[n];
    return i || this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    z((n) => {
      const { drag: s } = this.getProps();
      if (!oe(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, r = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n];
        r.set(t[n] - N(o, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!At(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    z((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = Md({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), z((o) => {
      if (!oe(o, t, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(N(l, u, i[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Bd.set(this.visualElement, this);
    const t = this.visualElement.current, n = Bt(t, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), s = () => {
      const { dragConstraints: l } = this.getProps();
      At(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: i } = this.visualElement, r = i.addEventListener("measure", s);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), w.read(s);
    const o = Xt(window, "resize", () => this.scalePositionWithinConstraints()), a = i.addEventListener("didUpdate", ({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (z((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    });
    return () => {
      o(), n(), r(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: r = !1, dragElastic: o = rn, dragMomentum: a = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: r,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function oe(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function jd(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class Gd extends ut {
  constructor(t) {
    super(t), this.removeGroupControls = G, this.removeListeners = G, this.controls = new Ud(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || G;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const ni = (e) => (t, n) => {
  e && w.postRender(() => e(t, n));
};
class Kd extends ut {
  constructor() {
    super(...arguments), this.removePointerDownListener = G;
  }
  onPointerDown(t) {
    this.session = new Hr(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Qr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: ni(t),
      onStart: ni(n),
      onMove: s,
      onEnd: (r, o) => {
        delete this.session, i && w.postRender(() => i(r, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Bt(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const ue = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function si(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const Vt = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (x.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = si(e, t.target.x), s = si(e, t.target.y);
    return `${n}% ${s}%`;
  }
}, Hd = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const s = e, i = lt.parse(e);
    if (i.length > 5)
      return s;
    const r = lt.createTransformer(e), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    i[0 + o] /= a, i[1 + o] /= l;
    const u = N(a, l, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), r(i);
  }
};
class Wd extends So {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: r } = t;
    Xc(zd), r && (n.group && n.group.add(r), s && s.register && i && s.register(r), r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({
      ...r.options,
      onExitComplete: () => this.safeToRemove()
    })), ue.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: r } = this.props, o = s.projection;
    return o && (o.isPresent = r, i || t.layoutDependency !== n || n === void 0 ? o.willUpdate() : this.safeToRemove(), t.isPresent !== r && (r ? o.promote() : o.relegate() || w.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), Cn.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = t;
    i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function to(e) {
  const [t, n] = Fi(), s = F(fn);
  return st(Wd, { ...e, layoutGroup: s, switchLayoutGroup: F(Ki), isPresent: t, safeToRemove: n });
}
const zd = {
  borderRadius: {
    ...Vt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Vt,
  borderTopRightRadius: Vt,
  borderBottomLeftRadius: Vt,
  borderBottomRightRadius: Vt,
  boxShadow: Hd
};
function Yd(e, t, n) {
  const s = $(e) ? e : Yt(e);
  return s.start(Wn("", s, t, n)), s.animation;
}
function qd(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
const Xd = (e, t) => e.depth - t.depth;
class Jd {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    Vn(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    _n(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(Xd), this.isDirty = !1, this.children.forEach(t);
  }
}
function Zd(e, t) {
  const n = et.now(), s = ({ timestamp: i }) => {
    const r = i - n;
    r >= t && (at(s), e(r - t));
  };
  return w.read(s, !0), () => at(s);
}
const eo = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Qd = eo.length, ii = (e) => typeof e == "string" ? parseFloat(e) : e, ri = (e) => typeof e == "number" || x.test(e);
function tp(e, t, n, s, i, r) {
  i ? (e.opacity = N(
    0,
    // TODO Reinstate this if only child
    n.opacity !== void 0 ? n.opacity : 1,
    ep(s)
  ), e.opacityExit = N(t.opacity !== void 0 ? t.opacity : 1, 0, np(s))) : r && (e.opacity = N(t.opacity !== void 0 ? t.opacity : 1, n.opacity !== void 0 ? n.opacity : 1, s));
  for (let o = 0; o < Qd; o++) {
    const a = `border${eo[o]}Radius`;
    let l = oi(t, a), u = oi(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || ri(l) === ri(u) ? (e[a] = Math.max(N(ii(l), ii(u), s), 0), (tt.test(u) || tt.test(l)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = N(t.rotate || 0, n.rotate || 0, s));
}
function oi(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const ep = /* @__PURE__ */ no(0, 0.5, vr), np = /* @__PURE__ */ no(0.5, 0.95, G);
function no(e, t, n) {
  return (s) => s < e ? 0 : s > t ? 1 : n(/* @__PURE__ */ Ot(e, t, s));
}
function ai(e, t) {
  e.min = t.min, e.max = t.max;
}
function W(e, t) {
  ai(e.x, t.x), ai(e.y, t.y);
}
function li(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
function ui(e, t, n, s, i) {
  return e -= t, e = Ce(e, 1 / n, s), i !== void 0 && (e = Ce(e, 1 / i, s)), e;
}
function sp(e, t = 0, n = 1, s = 0.5, i, r = e, o = e) {
  if (tt.test(t) && (t = parseFloat(t), t = N(o.min, o.max, t / 100) - o.min), typeof t != "number")
    return;
  let a = N(r.min, r.max, s);
  e === r && (a -= t), e.min = ui(e.min, t, n, a, i), e.max = ui(e.max, t, n, a, i);
}
function ci(e, t, [n, s, i], r, o) {
  sp(e, t[n], t[s], t[i], t.scale, r, o);
}
const ip = ["x", "scaleX", "originX"], rp = ["y", "scaleY", "originY"];
function hi(e, t, n, s) {
  ci(e.x, t, ip, n ? n.x : void 0, s ? s.x : void 0), ci(e.y, t, rp, n ? n.y : void 0, s ? s.y : void 0);
}
function fi(e) {
  return e.translate === 0 && e.scale === 1;
}
function so(e) {
  return fi(e.x) && fi(e.y);
}
function di(e, t) {
  return e.min === t.min && e.max === t.max;
}
function op(e, t) {
  return di(e.x, t.x) && di(e.y, t.y);
}
function pi(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function io(e, t) {
  return pi(e.x, t.x) && pi(e.y, t.y);
}
function mi(e) {
  return U(e.x) / U(e.y);
}
function gi(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class ap {
  constructor() {
    this.members = [];
  }
  add(t) {
    Vn(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (_n(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0)
      return !1;
    let s;
    for (let i = n; i >= 0; i--) {
      const r = this.members[i];
      if (r.isPresent !== !1) {
        s = r;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(t, n) {
    const s = this.lead;
    if (t !== s && (this.prevLead = s, this.lead = t, t.show(), s)) {
      s.instance && s.scheduleRender(), t.scheduleRender(), t.resumeFrom = s, n && (t.resumeFrom.preserveOpacity = !0), s.snapshot && (t.snapshot = s.snapshot, t.snapshot.latestValues = s.animationValues || s.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: s } = t;
      n.onExitComplete && n.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function lp(e, t, n) {
  let s = "";
  const i = e.x.translate / t.x, r = e.y.translate / t.y, o = (n == null ? void 0 : n.z) || 0;
  if ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (s += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: f, skewX: d, skewY: p } = n;
    u && (s = `perspective(${u}px) ${s}`), c && (s += `rotate(${c}deg) `), h && (s += `rotateX(${h}deg) `), f && (s += `rotateY(${f}deg) `), d && (s += `skewX(${d}deg) `), p && (s += `skewY(${p}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const $e = ["", "X", "Y", "Z"], up = { visibility: "hidden" }, yi = 1e3;
let cp = 0;
function Be(e, t, n, s) {
  const { latestValues: i } = t;
  i[e] && (n[e] = i[e], t.setStaticValue(e, 0), s && (s[e] = 0));
}
function ro(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = fr(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: r } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", w, !(i || r));
  }
  const { parent: s } = e;
  s && !s.hasCheckedOptimisedAppear && ro(s);
}
function oo({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      this.id = cp++, this.animationId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(dp), this.nodes.forEach(Sp), this.nodes.forEach(vp), this.nodes.forEach(pp);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Jd());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Fn()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o, a = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = qd(o), this.instance = o;
      const { layoutId: l, layout: u, visualElement: c } = this.options;
      if (c && !c.current && c.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), a && (u || l) && (this.isLayoutDirty = !0), e) {
        let h;
        const f = () => this.root.updateBlockedByResize = !1;
        e(o, () => {
          this.root.updateBlockedByResize = !0, h && h(), h = Zd(f, 250), ue.hasAnimatedSinceResize && (ue.hasAnimatedSinceResize = !1, this.nodes.forEach(vi));
        });
      }
      l && this.root.registerSharedNode(l, this), this.options.animate !== !1 && c && (l || u) && this.addEventListener("didUpdate", ({ delta: h, hasLayoutChanged: f, hasRelativeLayoutChanged: d, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || c.getDefaultTransition() || Ep, { onLayoutAnimationStart: g, onLayoutAnimationComplete: y } = c.getProps(), S = !this.targetLayout || !io(this.targetLayout, p), v = !f && d;
        if (this.options.layoutRoot || this.resumeFrom || v || f && (S || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0), this.setAnimationOrigin(h, v);
          const E = {
            ...In(m, "layout"),
            onPlay: g,
            onComplete: y
          };
          (c.shouldReduceMotion || this.options.layoutRoot) && (E.delay = 0, E.type = !1), this.startAnimation(E);
        } else
          f || vi(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, at(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Cp), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && ro(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Si);
        return;
      }
      this.isUpdating || this.nodes.forEach(gp), this.isUpdating = !1, this.nodes.forEach(yp), this.nodes.forEach(hp), this.nodes.forEach(fp), this.clearAllSnapshots();
      const a = et.now();
      _.delta = it(0, 1e3 / 60, a - _.timestamp), _.timestamp = a, _.isProcessing = !0, we.update.process(_), we.preRender.process(_), we.render.process(_), _.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Cn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(mp), this.sharedNodes.forEach(Tp);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, w.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      w.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !U(this.snapshot.measuredBox.x) && !U(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = M(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a) {
        const l = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!i)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !so(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && (a || ht(this.latestValues) || c) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), Pp(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var o;
      const { visualElement: a } = this.options;
      if (!a)
        return M();
      const l = a.measureViewportBox();
      if (!(((o = this.scroll) === null || o === void 0 ? void 0 : o.wasRoot) || this.path.some(Rp))) {
        const { scroll: c } = this.root;
        c && (Pt(l.x, c.offset.x), Pt(l.y, c.offset.y));
      }
      return l;
    }
    removeElementScroll(o) {
      var a;
      const l = M();
      if (W(l, o), !((a = this.scroll) === null || a === void 0) && a.wasRoot)
        return l;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u], { scroll: h, options: f } = c;
        c !== this.root && h && f.layoutScroll && (h.wasRoot && W(l, o), Pt(l.x, h.offset.x), Pt(l.y, h.offset.y));
      }
      return l;
    }
    applyTransform(o, a = !1) {
      const l = M();
      W(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && Rt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), ht(c.latestValues) && Rt(l, c.latestValues);
      }
      return ht(this.latestValues) && Rt(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = M();
      W(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ht(u.latestValues))
          continue;
        on(u.latestValues) && u.updateSnapshot();
        const c = M(), h = u.measurePageBox();
        W(c, h), hi(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return ht(this.latestValues) && hi(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== _.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== l;
      if (!(o || u && this.isSharedProjectionDirty || this.isProjectionDirty || !((a = this.parent) === null || a === void 0) && a.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: h, layoutId: f } = this.options;
      if (!(!this.layout || !(h || f))) {
        if (this.resolvedRelativeTargetAt = _.timestamp, !this.targetDelta && !this.relativeTarget) {
          const d = this.getClosestProjectingParent();
          d && d.layout && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), jt(this.relativeTargetOrigin, this.layout.layoutBox, d.layout.layoutBox), W(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = M(), this.targetWithTransforms = M()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Ld(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : W(this.target, this.layout.layoutBox), Jr(this.target, this.targetDelta)) : W(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const d = this.getClosestProjectingParent();
          d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = M(), this.relativeTargetOrigin = M(), jt(this.relativeTargetOrigin, this.target, d.target), W(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || on(this.parent.latestValues) || Xr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var o;
      const a = this.getLead(), l = !!this.resumingFrom || this !== a;
      let u = !0;
      if ((this.isProjectionDirty || !((o = this.parent) === null || o === void 0) && o.isProjectionDirty) && (u = !1), l && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1), this.resolvedRelativeTargetAt === _.timestamp && (u = !1), u)
        return;
      const { layout: c, layoutId: h } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || h))
        return;
      W(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x, d = this.treeScale.y;
      kd(this.layoutCorrected, this.treeScale, this.path, l), a.layout && !a.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (a.target = a.layout.layoutBox, a.targetWithTransforms = M());
      const { target: p } = a;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (li(this.prevProjectionDelta.x, this.projectionDelta.x), li(this.prevProjectionDelta.y, this.projectionDelta.y)), Ut(this.projectionDelta, this.layoutCorrected, p, this.latestValues), (this.treeScale.x !== f || this.treeScale.y !== d || !gi(this.projectionDelta.x, this.prevProjectionDelta.x) || !gi(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      var a;
      if ((a = this.options.visualElement) === null || a === void 0 || a.scheduleRender(), o) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Et(), this.projectionDelta = Et(), this.projectionDeltaWithTransform = Et();
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = Et();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = M(), d = l ? l.source : void 0, p = this.layout ? this.layout.source : void 0, m = d !== p, g = this.getStack(), y = !g || g.members.length <= 1, S = !!(m && !y && this.options.crossfade === !0 && !this.path.some(xp));
      this.animationProgress = 0;
      let v;
      this.mixTargetDelta = (E) => {
        const T = E / 1e3;
        Ci(h.x, o.x, T), Ci(h.y, o.y, T), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (jt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Ap(this.relativeTarget, this.relativeTargetOrigin, f, T), v && op(this.relativeTarget, v) && (this.isProjectionDirty = !1), v || (v = M()), W(v, this.relativeTarget)), m && (this.animationValues = c, tp(c, u, this.latestValues, T, S, y)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = T;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation && this.currentAnimation.stop(), this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(), this.pendingAnimation && (at(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = w.update(() => {
        ue.hasAnimatedSinceResize = !0, this.currentAnimation = Yd(0, yi, {
          ...o,
          onUpdate: (a) => {
            this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(yi), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && ao(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || M();
          const h = U(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + h;
          const f = U(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + f;
        }
        W(a, l), Rt(a, c), Ut(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new ap()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var o;
      const { layoutId: a } = this.options;
      return a ? ((o = this.getStack()) === null || o === void 0 ? void 0 : o.lead) || this : this;
    }
    getPrevLead() {
      var o;
      const { layoutId: a } = this.options;
      return a ? (o = this.getStack()) === null || o === void 0 ? void 0 : o.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && Be("z", o, u, this.animationValues);
      for (let c = 0; c < $e.length; c++)
        Be(`rotate${$e[c]}`, o, u, this.animationValues), Be(`skew${$e[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    getProjectionStyles(o) {
      var a, l;
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible)
        return up;
      const u = {
        visibility: ""
      }, c = this.getTransformTemplate();
      if (this.needsReset)
        return this.needsReset = !1, u.opacity = "", u.pointerEvents = ae(o == null ? void 0 : o.pointerEvents) || "", u.transform = c ? c(this.latestValues, "") : "none", u;
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        const m = {};
        return this.options.layoutId && (m.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, m.pointerEvents = ae(o == null ? void 0 : o.pointerEvents) || ""), this.hasProjected && !ht(this.latestValues) && (m.transform = c ? c({}, "") : "none", this.hasProjected = !1), m;
      }
      const f = h.animationValues || h.latestValues;
      this.applyTransformsToTarget(), u.transform = lp(this.projectionDeltaWithTransform, this.treeScale, f), c && (u.transform = c(f, u.transform));
      const { x: d, y: p } = this.projectionDelta;
      u.transformOrigin = `${d.origin * 100}% ${p.origin * 100}% 0`, h.animationValues ? u.opacity = h === this ? (l = (a = f.opacity) !== null && a !== void 0 ? a : this.latestValues.opacity) !== null && l !== void 0 ? l : 1 : this.preserveOpacity ? this.latestValues.opacity : f.opacityExit : u.opacity = h === this ? f.opacity !== void 0 ? f.opacity : "" : f.opacityExit !== void 0 ? f.opacityExit : 0;
      for (const m in Ht) {
        if (f[m] === void 0)
          continue;
        const { correct: g, applyTo: y, isCSSVariable: S } = Ht[m], v = u.transform === "none" ? f[m] : g(f[m], h);
        if (y) {
          const E = y.length;
          for (let T = 0; T < E; T++)
            u[y[T]] = v;
        } else
          S ? this.options.visualElement.renderState.vars[m] = v : u[m] = v;
      }
      return this.options.layoutId && (u.pointerEvents = h === this ? ae(o == null ? void 0 : o.pointerEvents) || "" : "none"), u;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) === null || a === void 0 ? void 0 : a.stop();
      }), this.root.nodes.forEach(Si), this.root.sharedNodes.clear();
    }
  };
}
function hp(e) {
  e.updateLayout();
}
function fp(e) {
  var t;
  const n = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: i } = e.layout, { animationType: r } = e.options, o = n.source !== e.layout.source;
    r === "size" ? z((h) => {
      const f = o ? n.measuredBox[h] : n.layoutBox[h], d = U(f);
      f.min = s[h].min, f.max = f.min + d;
    }) : ao(r, n.layoutBox, s) && z((h) => {
      const f = o ? n.measuredBox[h] : n.layoutBox[h], d = U(s[h]);
      f.max = f.min + d, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[h].max = e.relativeTarget[h].min + d);
    });
    const a = Et();
    Ut(a, s, n.layoutBox);
    const l = Et();
    o ? Ut(l, e.applyTransform(i, !0), n.measuredBox) : Ut(l, s, n.layoutBox);
    const u = !so(a);
    let c = !1;
    if (!e.resumeFrom) {
      const h = e.getClosestProjectingParent();
      if (h && !h.resumeFrom) {
        const { snapshot: f, layout: d } = h;
        if (f && d) {
          const p = M();
          jt(p, n.layoutBox, f.layoutBox);
          const m = M();
          jt(m, s, d.layoutBox), io(p, m) || (c = !0), h.options.layoutRoot && (e.relativeTarget = m, e.relativeTargetOrigin = p, e.relativeParent = h);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: s,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c
    });
  } else if (e.isLead()) {
    const { onExitComplete: s } = e.options;
    s && s();
  }
  e.options.transition = void 0;
}
function dp(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function pp(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function mp(e) {
  e.clearSnapshot();
}
function Si(e) {
  e.clearMeasurements();
}
function gp(e) {
  e.isLayoutDirty = !1;
}
function yp(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function vi(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function Sp(e) {
  e.resolveTargetDelta();
}
function vp(e) {
  e.calcProjection();
}
function Cp(e) {
  e.resetSkewAndRotation();
}
function Tp(e) {
  e.removeLeadSnapshot();
}
function Ci(e, t, n) {
  e.translate = N(t.translate, 0, n), e.scale = N(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function Ti(e, t, n, s) {
  e.min = N(t.min, n.min, s), e.max = N(t.max, n.max, s);
}
function Ap(e, t, n, s) {
  Ti(e.x, t.x, n.x, s), Ti(e.y, t.y, n.y, s);
}
function xp(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Ep = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Ai = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), xi = Ai("applewebkit/") && !Ai("chrome/") ? Math.round : G;
function Ei(e) {
  e.min = xi(e.min), e.max = xi(e.max);
}
function Pp(e) {
  Ei(e.x), Ei(e.y);
}
function ao(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !bd(mi(t), mi(n), 0.2);
}
function Rp(e) {
  var t;
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot);
}
const Op = oo({
  attachResizeListener: (e, t) => Xt(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ue = {
  current: void 0
}, lo = oo({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!Ue.current) {
      const e = new Op({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), Ue.current = e;
    }
    return Ue.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), bp = {
  pan: {
    Feature: Kd
  },
  drag: {
    Feature: Gd,
    ProjectionNode: lo,
    MeasureLayout: to
  }
};
function Pi(e, t, n) {
  const { props: s } = e;
  e.animationState && s.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, r = s[i];
  r && w.postRender(() => r(t, te(t)));
}
class Lp extends ut {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = Oh(t, (n, s) => (Pi(this.node, s, "Start"), (i) => Pi(this.node, i, "End"))));
  }
  unmount() {
  }
}
class wp extends ut {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Qt(Xt(this.node.current, "focus", () => this.onFocus()), Xt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ri(e, t, n) {
  const { props: s } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && s.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), r = s[i];
  r && w.postRender(() => r(t, te(t)));
}
class Ip extends ut {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = Ih(t, (n, s) => (Ri(this.node, s, "Start"), (i, { success: r }) => Ri(this.node, i, r ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const ln = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), Np = (e) => {
  const t = ln.get(e.target);
  t && t(e);
}, Mp = (e) => {
  e.forEach(Np);
};
function Dp({ root: e, ...t }) {
  const n = e || document;
  je.has(n) || je.set(n, {});
  const s = je.get(n), i = JSON.stringify(t);
  return s[i] || (s[i] = new IntersectionObserver(Mp, { root: e, ...t })), s[i];
}
function Vp(e, t, n) {
  const s = Dp(t);
  return ln.set(e, n), s.observe(e), () => {
    ln.delete(e), s.unobserve(e);
  };
}
const _p = {
  some: 0,
  all: 1
};
class Fp extends ut {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: r } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : _p[i]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, r && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), f = u ? c : h;
      f && f(l);
    };
    return Vp(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(kp(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function kp({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const $p = {
  inView: {
    Feature: Fp
  },
  tap: {
    Feature: Ip
  },
  focus: {
    Feature: wp
  },
  hover: {
    Feature: Lp
  }
}, Bp = {
  layout: {
    ProjectionNode: lo,
    MeasureLayout: to
  }
}, un = { current: null }, uo = { current: !1 };
function Up() {
  if (uo.current = !0, !!mn)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => un.current = e.matches;
      e.addListener(t), t();
    } else
      un.current = !1;
}
const jp = [...Mr, k, lt], Gp = (e) => jp.find(Nr(e)), Kp = /* @__PURE__ */ new WeakMap();
function Hp(e, t, n) {
  for (const s in t) {
    const i = t[s], r = n[s];
    if ($(i))
      e.addValue(s, i), process.env.NODE_ENV === "development" && Ee(i.version === "12.4.2", `Attempting to mix Motion versions ${i.version} with 12.4.2 may not work as expected.`);
    else if ($(r))
      e.addValue(s, Yt(i, { owner: e }));
    else if (r !== i)
      if (e.hasValue(s)) {
        const o = e.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = e.getStaticValue(s);
        e.addValue(s, Yt(o !== void 0 ? o : i, { owner: e }));
      }
  }
  for (const s in n)
    t[s] === void 0 && e.removeValue(s);
  return t;
}
const Oi = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Wp {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, s) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Gn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = et.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, w.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u, onUpdate: c } = o;
    this.onUpdate = c, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Oe(n), this.isVariantNode = ji(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in f) {
      const p = f[d];
      l[d] !== void 0 && $(p) && p.set(l[d], !1);
    }
  }
  mount(t) {
    this.current = t, Kp.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), uo.current || Up(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : un.current, process.env.NODE_ENV !== "production" && Ee(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), at(this.notifyUpdate), at(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = St.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
      this.latestValues[t] = a, this.props.onUpdate && w.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
    }), r = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      i(), r(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in bt) {
      const n = bt[t];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[t] && i && s(this.props) && (this.features[t] = new i(this)), this.features[t]) {
        const r = this.features[t];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : M();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Oi.length; s++) {
      const i = Oi[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = t[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Hp(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const s = this.values.get(t);
    n !== s && (s && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let s = this.values.get(t);
    return s === void 0 && n !== void 0 && (s = Yt(n === null ? void 0 : n, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    var s;
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : (s = this.getBaseTargetFromProps(this.props, t)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (wr(i) || Tr(i)) ? i = parseFloat(i) : !Gp(i) && lt.test(n) && (i = Or(t, n)), this.setBaseTarget(t, $(i) ? i.get() : i)), $(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var n;
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const o = Ln(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (i = o[t]);
    }
    if (s && i !== void 0)
      return i;
    const r = this.getBaseTargetFromProps(this.props, t);
    return r !== void 0 && !$(r) ? r : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Fn()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class co extends Wp {
  constructor() {
    super(...arguments), this.KeyframeResolver = Dr;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: s }) {
    delete n[t], delete s[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    $(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function zp(e) {
  return window.getComputedStyle(e);
}
class Yp extends co {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Qi;
  }
  readValueFromInstance(t, n) {
    if (St.has(n)) {
      const s = jn(n);
      return s && s.default || 0;
    } else {
      const s = zp(t), i = (Tn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Zr(t, n);
  }
  build(t, n, s) {
    En(t, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return wn(t, n, s);
  }
}
class qp extends co {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = M, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Zi(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (St.has(n)) {
      const s = jn(n);
      return s && s.default || 0;
    }
    return n = tr.has(n) ? n : vn(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return nr(t, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && w.postRender(this.updateDimensions);
  }
  build(t, n, s) {
    On(t, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(t, n, s, i) {
    er(t, n, s, i);
  }
  mount(t) {
    this.isSVGTag = bn(t.tagName), super.mount(t);
  }
}
const Xp = (e, t) => Rn(e) ? new qp(t) : new Yp(t, {
  allowProjection: e !== Ii
}), Jp = /* @__PURE__ */ Ch({
  ...vd,
  ...$p,
  ...bp,
  ...Bp
}, Xp), Zp = /* @__PURE__ */ _c(Jp), Qp = "_popup_104a0_1", tm = "_button_104a0_19", bi = {
  popup: Qp,
  button: tm
}, im = () => {
  const { i18n: e } = Qo(), [t, n] = ce(!1);
  mt(() => {
    n(!0);
    const i = setTimeout(() => {
      n(!1);
    }, 4e3);
    return () => clearTimeout(i);
  }, []);
  const s = () => {
    const i = e.language === "en" ? "fr" : "en";
    e.changeLanguage(i), n(!1);
  };
  return /* @__PURE__ */ st(bc, { children: t && /* @__PURE__ */ Li(
    Zp.div,
    {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
      transition: { duration: 0.5 },
      className: bi.popup,
      children: [
        e.language === "en" ? "Switch to French?" : "Passer à l'anglais?",
        /* @__PURE__ */ st("button", { onClick: s, className: bi.button, children: "Yes" })
      ]
    }
  ) });
};
export {
  im as LanguageSwitcher,
  B as i18n
};
