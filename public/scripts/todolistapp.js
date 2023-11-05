(() => {
    "use strict";

    function t(t, e, n) {
        this.id = t, this.name = e, this.tasks = n
    }

    const e = (() => {
        const e = () => null === localStorage.getItem("projects") ? [] : JSON.parse(localStorage.getItem("projects")),
            n = () => null === localStorage.getItem("defaultProjects") ? [] : JSON.parse(localStorage.getItem("defaultProjects")),
            a = t => localStorage.setItem("projects", JSON.stringify(t)),
            r = t => localStorage.setItem("defaultProjects", JSON.stringify(t)), o = (t, o) => {
                const i = o ? n() : e(), s = i[t].tasks;
                for (let t = 0; t < s.length; t++) s[t].id = t;
                o ? r(i) : a(i)
            };
        return localStorage.getItem("defaultProjects") || (localStorage.setItem("defaultProjects", JSON.stringify([])), localStorage.getItem("projects") || localStorage.setItem("projects", JSON.stringify([]))), (() => {
            let e = n();
            if (e.length > 0) return;
            const a = ["Inbox"];
            for (let n = 0; n < a.length; n++) {
                const r = new t(n, a[n], []);
                e = [...e, r]
            }
            r(e)
        })(), {
            addProject: t => {
                let n = e();
                const r = JSON.parse(JSON.stringify(t));
                n = [...n, r], a(n)
            },
            addTaskToProject: t => {
                const o = t.isProjectInbox, i = o ? n() : e(), s = i[t.projectId];
                s.tasks = [...s.tasks, t], o ? r(i) : a(i)
            },
            editTask: (t, o, i, s) => {
                const d = s.isProjectInbox, c = s.isProjectInbox, u = d ? n() : e(), l = s.projectId, m = u[l].tasks;
                l !== o || d !== i || (m[t] = s, m[t].id = t), c ? r(u) : a(u)
            },
            getDefaultProjects: n,
            getNewDefaultProjectTaskId: t => n()[t].tasks.length,
            getNewProjectId: () => Object.keys(e()).length,
            getNewTaskId: (t, a) => (a ? n() : e())[t].tasks.length,
            getProjects: e,
            getTaskObj: t => {
                const a = "true" === t.dataset.isProjectInbox, r = t.dataset.projectId, o = t.dataset.id;
                return (a ? n() : e())[r].tasks[o]
            },
            removeProject: t => {
                let n = e();
                n.splice(t, 1), a(n)
            },
            removeTask: (t, i, s) => {
                const d = s ? n() : e();
                d[t].tasks.splice(i, 1), s ? r(d) : a(d), o(t, s)
            },
            removeTaskFromDefaultProject: (t, e) => {
                const i = n(), s = i[t].tasks;
                e = parseInt(e), t = parseInt(t), s.splice(e, 1), o(t, !0), a(i), r(i)
            },
            updateProjectIds: () => {
                const t = e();
                for (let e = 0; e < t.length; e++) t[e].id = e;
                a(t)
            },
            updateTaskProjectIds: () => {
                const t = e();
                for (let e = 0; e < t.length; e++) {
                    const n = t[e], a = n.id, r = n.tasks;
                    for (const t of r) t.projectId = a
                }
                a(t)
            },
            updateDefaultProjectTaskIds: t => {
                const e = n(), a = e[t].tasks;
                for (let t = 0; t < a.length; t++) a[t].defaultProjectTaskId = t;
                r(e)
            }
        }
    })();

    function n(t, e, n, a, r, o, i, s, d, c) {
        this.id = t, this.name = e, this.description = n, this.dueDate = a, this.formattedDueDate = r, this.projectId = o, this.priority = i, this.isProjectInbox = s, this.defaultProjectId = d, this.defaultProjectTaskId = c
    }

    const a = () => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return t.setAttribute("viewBox", "0 0 12 12"), t.setAttribute("fill", "none"), e.setAttribute("fill", "currentColor"), e.setAttribute("fill-rule", "evenodd"), e.setAttribute("clip-rule", "evenodd"), e.setAttribute("d", "M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"), t.appendChild(e), t
    }, r = () => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return e.setAttribute("fill", "currentColor"), e.setAttribute("d", "M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"), t.appendChild(e), t
    }, o = () => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            e = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            n = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            a = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            r = document.createElementNS("http://www.w3.org/2000/svg", "g"),
            o = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        return r.setAttribute("fill", "none"), r.setAttribute("fill-rule", "evenodd"), e.setAttribute("d", "M0 0h24v24H0z"), o.setAttribute("x", "5"), o.setAttribute("y", "6"), o.setAttribute("fill", "currentColor"), o.setAttribute("rx", ".5"), n.setAttribute("fill", "currentColor"), n.setAttribute("d", "M10 9h1v8h-1V9zm3 0h1v8h-1V9z"), a.setAttribute("stroke", "currentColor"), a.setAttribute("d", "M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"), r.append(e, o, n, a), t.append(r), t
    }, i = () => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            e = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            n = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            a = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            r = document.createElementNS("http://www.w3.org/2000/svg", "g");
        return r.setAttribute("fill", "none"), r.setAttribute("fill-rule", "evenodd"), e.setAttribute("fill", "currentColor"), e.setAttribute("d", "M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"), n.setAttribute("stroke", "currentColor"), n.setAttribute("d", "M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"), r.append(e, n, a), t.append(r), t
    }, s = () => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return t.classList.add("project-icon"), t.setAttribute("viewBox", "0 0 24 24"), e.setAttribute("d", "M12 7a5 5 0 110 10 5 5 0 010-10z"), e.setAttribute("fill", "currentColor"), t.appendChild(e), t
    }, d = (() => {
        const t = () => {
            const t = document.querySelectorAll(".task-button");
            for (let e = 0; e < t.length; e++) t[e].dataset.id = e
        }, n = () => {
            const t = document.querySelectorAll(".task-button");
            let e = [], n = [];
            for (const a of t) {
                const t = a.dataset.defaultProjectId;
                "null" === t || ("1" !== t ? n = [...n, a] : e = [...e, a])
            }
            for (let t = 0; t < e.length; t++) e[t].dataset.defaultProjectTaskId = t;
            for (let t = 0; t < n.length; t++) n[t].dataset.defaultProjectTaskId = t
        }, o = a => {
            const r = parseInt(a.dataset.projectId), o = parseInt(a.dataset.id),
                i = "true" === a.dataset.isProjectInbox;
            e.removeTask(r, o, i), a.remove(), t(), n()
        }, s = t => document.querySelector(`.task-button[data-id="${t}"]`);
        return {
            editTaskButton: (t, e, n) => {
                const r = s(t), i = n.name, d = n.description, c = n.formattedDueDate, u = n.priority,
                    l = document.querySelector(`.task-button[data-id="${n.id}"] .task-button-task-name`),
                    m = document.querySelector(`.task-button[data-id="${n.id}"] .task-button-description-text`),
                    h = document.querySelector(`.task-button[data-id="${n.id}"] .task-button-due-date-text`),
                    g = null === m, f = null === h, p = "true" === r.dataset.isProjectInbox;
                if (e !== n.projectId || n.isProjectInbox !== p) {
                    const t = gt.getSelectedButton();
                    o(r), mt.loadEmptyStateIfProjectEmpty(t)
                }
                l.innerText = i, d && !g ? m.innerText = d : "" !== d || g ? d && g && ((t, e) => {
                    const n = document.createElement("div"), a = document.createElement("p"),
                        r = document.querySelector(`.task-button[data-id='${t.dataset.id}'] > .task-button-due-date`),
                        o = null !== r;
                    n.classList.add("task-button-description"), a.classList.add("task-button-description-text"), a.textContent = e, n.appendChild(a), o ? t.insertBefore(n, r) : t.appendChild(n)
                })(r, d) : (t => {
                    document.querySelector(`.task-button[data-id="${t}"] .task-button-description`).remove()
                })(t), c && !f ? h.innerText = c : null !== c || f || (t => {
                    document.querySelector(`.task-button[data-id="${t}"] .task-button-due-date`).remove()
                })(t), c && f && ((t, e) => {
                    const n = document.createElement("div"), r = document.createElement("div"), o = a(),
                        i = document.createElement("p");
                    n.classList.add("task-button-due-date"), r.classList.add("task-button-due-date-left"), o.classList.add("calendar-icon"), i.classList.add("task-button-due-date-text"), i.innerText = e, r.append(o, i), n.append(r), t.appendChild(n)
                })(r, c), r.dataset.priority = u
            }, getTaskButton: e => {
                const n = !e.dueDate, s = !e.description, d = document.createElement("button"),
                    c = document.createElement("div"), u = document.createElement("div"),
                    l = document.createElement("div"), m = document.createElement("button"), h = i(),
                    g = document.createElement("p"), f = document.createElement("div"),
                    p = document.createElement("button"), b = r();
                if (d.classList.add("task-button"), c.classList.add("task-button-top"), u.classList.add("task-button-top-left"), l.classList.add("task-button-top-right"), m.classList.add("task-button-edit-button", "task-button-action-button"), f.classList.add("task-button-checkbox-button-div"), p.classList.add("task-button-checkbox-button"), b.classList.add("task-button-checkbox-icon", "project-icon"), g.classList.add("task-button-task-name"), g.innerText = e.name, d.dataset.projectId = e.projectId, d.dataset.id = e.id, d.dataset.isProjectInbox = e.isProjectInbox, d.dataset.priority = e.priority, d.dataset.defaultProjectId = e.defaultProjectId, d.dataset.defaultProjectTaskId = e.defaultProjectTaskId, f.appendChild(p), p.appendChild(b), u.append(f, g), m.appendChild(h), m.appendChild(h), l.append(m), c.append(u, l), d.append(c), ((t, e) => {
                    e.addEventListener("click", (() => {
                        e.classList.add("clicked")
                    })), e.addEventListener("animationend", (() => {
                        o(t);
                        const e = gt.getSelectedButton();
                        mt.loadEmptyStateIfProjectEmpty(e)
                    }))
                })(d, p), ((t, e) => {
                    e.addEventListener("click", (() => {
                        lt.addDataAttributesToModal(t), lt.toggleModal(), lt.addEditClass(), lt.disableProjectSelector(), lt.changeSubmitButtonText("Save"), lt.addTaskDataToModal(t), lt.enableSubmitButton()
                    }))
                })(d, m), n && s) return d;
                const v = document.createElement("div"), w = document.createElement("p");
                if (v.classList.add("task-button-description"), w.classList.add("task-button-description-text"), w.innerText = e.description, v.append(w), d.append(v), n) return d;
                const y = document.createElement("div"), k = document.createElement("div"), S = a(),
                    T = document.createElement("p");
                return y.classList.add("task-button-due-date"), k.classList.add("task-button-due-date-left"), S.classList.add("calendar-icon"), T.classList.add("task-button-due-date-text"), T.innerText = e.formattedDueDate, k.append(S, T), y.append(k), d.append(y), t(), d
            }, getTaskButtonFromId: s, updateTaskButtonIds: t, updateTaskButtonDefaultProjectTaskIds: n
        }
    })();

    function c(t, e) {
        if (e.length < t) throw new TypeError(t + " argument" + (t > 1 ? "s" : "") + " required, but only " + e.length + " present")
    }

    function u(t) {
        return c(1, arguments), t instanceof Date || "object" == typeof t && "[object Date]" === Object.prototype.toString.call(t)
    }

    function l(t) {
        c(1, arguments);
        var e = Object.prototype.toString.call(t);
        return t instanceof Date || "object" == typeof t && "[object Date]" === e ? new Date(t.getTime()) : "number" == typeof t || "[object Number]" === e ? new Date(t) : ("string" != typeof t && "[object String]" !== e || "undefined" == typeof console || (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn((new Error).stack)), new Date(NaN))
    }

    function m(t) {
        if (c(1, arguments), !u(t) && "number" != typeof t) return !1;
        var e = l(t);
        return !isNaN(Number(e))
    }

    var h = {
        lessThanXSeconds: {one: "less than a second", other: "less than {{count}} seconds"},
        xSeconds: {one: "1 second", other: "{{count}} seconds"},
        halfAMinute: "half a minute",
        lessThanXMinutes: {one: "less than a minute", other: "less than {{count}} minutes"},
        xMinutes: {one: "1 minute", other: "{{count}} minutes"},
        aboutXHours: {one: "about 1 hour", other: "about {{count}} hours"},
        xHours: {one: "1 hour", other: "{{count}} hours"},
        xDays: {one: "1 day", other: "{{count}} days"},
        aboutXWeeks: {one: "about 1 week", other: "about {{count}} weeks"},
        xWeeks: {one: "1 week", other: "{{count}} weeks"},
        aboutXMonths: {one: "about 1 month", other: "about {{count}} months"},
        xMonths: {one: "1 month", other: "{{count}} months"},
        aboutXYears: {one: "about 1 year", other: "about {{count}} years"},
        xYears: {one: "1 year", other: "{{count}} years"},
        overXYears: {one: "over 1 year", other: "over {{count}} years"},
        almostXYears: {one: "almost 1 year", other: "almost {{count}} years"}
    };

    function g(t) {
        return function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.width ? String(e.width) : t.defaultWidth, a = t.formats[n] || t.formats[t.defaultWidth];
            return a
        }
    }

    var f, p = {
        date: g({
            formats: {full: "EEEE, MMMM do, y", long: "MMMM do, y", medium: "MMM d, y", short: "MM/dd/yyyy"},
            defaultWidth: "full"
        }),
        time: g({
            formats: {full: "h:mm:ss a zzzz", long: "h:mm:ss a z", medium: "h:mm:ss a", short: "h:mm a"},
            defaultWidth: "full"
        }),
        dateTime: g({
            formats: {
                full: "{{date}} 'at' {{time}}",
                long: "{{date}} 'at' {{time}}",
                medium: "{{date}}, {{time}}",
                short: "{{date}}, {{time}}"
            }, defaultWidth: "full"
        })
    }, b = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    };

    function v(t) {
        return function (e, n) {
            var a, r = n || {};
            if ("formatting" === (r.context ? String(r.context) : "standalone") && t.formattingValues) {
                var o = t.defaultFormattingWidth || t.defaultWidth, i = r.width ? String(r.width) : o;
                a = t.formattingValues[i] || t.formattingValues[o]
            } else {
                var s = t.defaultWidth, d = r.width ? String(r.width) : t.defaultWidth;
                a = t.values[d] || t.values[s]
            }
            return a[t.argumentCallback ? t.argumentCallback(e) : e]
        }
    }

    function w(t) {
        return function (e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = n.width,
                r = a && t.matchPatterns[a] || t.matchPatterns[t.defaultMatchWidth], o = e.match(r);
            if (!o) return null;
            var i, s = o[0], d = a && t.parsePatterns[a] || t.parsePatterns[t.defaultParseWidth],
                c = Array.isArray(d) ? k(d, (function (t) {
                    return t.test(s)
                })) : y(d, (function (t) {
                    return t.test(s)
                }));
            i = t.valueCallback ? t.valueCallback(c) : c, i = n.valueCallback ? n.valueCallback(i) : i;
            var u = e.slice(s.length);
            return {value: i, rest: u}
        }
    }

    function y(t, e) {
        for (var n in t) if (t.hasOwnProperty(n) && e(t[n])) return n
    }

    function k(t, e) {
        for (var n = 0; n < t.length; n++) if (e(t[n])) return n
    }

    const S = {
        code: "en-US", formatDistance: function (t, e, n) {
            var a, r = h[t];
            return a = "string" == typeof r ? r : 1 === e ? r.one : r.other.replace("{{count}}", e.toString()), null != n && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a
        }, formatLong: p, formatRelative: function (t, e, n, a) {
            return b[t]
        }, localize: {
            ordinalNumber: function (t, e) {
                var n = Number(t), a = n % 100;
                if (a > 20 || a < 10) switch (a % 10) {
                    case 1:
                        return n + "st";
                    case 2:
                        return n + "nd";
                    case 3:
                        return n + "rd"
                }
                return n + "th"
            },
            era: v({
                values: {narrow: ["B", "A"], abbreviated: ["BC", "AD"], wide: ["Before Christ", "Anno Domini"]},
                defaultWidth: "wide"
            }),
            quarter: v({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
                }, defaultWidth: "wide", argumentCallback: function (t) {
                    return t - 1
                }
            }),
            month: v({
                values: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                }, defaultWidth: "wide"
            }),
            day: v({
                values: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                }, defaultWidth: "wide"
            }),
            dayPeriod: v({
                values: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    }
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    }
                },
                defaultFormattingWidth: "wide"
            })
        }, match: {
            ordinalNumber: (f = {
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: function (t) {
                    return parseInt(t, 10)
                }
            }, function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = t.match(f.matchPattern);
                if (!n) return null;
                var a = n[0], r = t.match(f.parsePattern);
                if (!r) return null;
                var o = f.valueCallback ? f.valueCallback(r[0]) : r[0];
                o = e.valueCallback ? e.valueCallback(o) : o;
                var i = t.slice(a.length);
                return {value: o, rest: i}
            }),
            era: w({
                matchPatterns: {
                    narrow: /^(b|a)/i,
                    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                    wide: /^(before christ|before common era|anno domini|common era)/i
                }, defaultMatchWidth: "wide", parsePatterns: {any: [/^b/i, /^(a|c)/i]}, defaultParseWidth: "any"
            }),
            quarter: w({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^q[1234]/i,
                    wide: /^[1234](th|st|nd|rd)? quarter/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {any: [/1/i, /2/i, /3/i, /4/i]},
                defaultParseWidth: "any",
                valueCallback: function (t) {
                    return t + 1
                }
            }),
            month: w({
                matchPatterns: {
                    narrow: /^[jfmasond]/i,
                    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
                    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
                },
                defaultParseWidth: "any"
            }),
            day: w({
                matchPatterns: {
                    narrow: /^[smtwf]/i,
                    short: /^(su|mo|tu|we|th|fr|sa)/i,
                    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
                },
                defaultParseWidth: "any"
            }),
            dayPeriod: w({
                matchPatterns: {
                    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
                },
                defaultMatchWidth: "any",
                parsePatterns: {
                    any: {
                        am: /^a/i,
                        pm: /^p/i,
                        midnight: /^mi/i,
                        noon: /^no/i,
                        morning: /morning/i,
                        afternoon: /afternoon/i,
                        evening: /evening/i,
                        night: /night/i
                    }
                },
                defaultParseWidth: "any"
            })
        }, options: {weekStartsOn: 0, firstWeekContainsDate: 1}
    };

    function T(t) {
        if (null === t || !0 === t || !1 === t) return NaN;
        var e = Number(t);
        return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e)
    }

    function j(t, e) {
        c(2, arguments);
        var n = l(t).getTime(), a = T(e);
        return new Date(n + a)
    }

    function C(t, e) {
        c(2, arguments);
        var n = T(e);
        return j(t, -n)
    }

    var P = 864e5;

    function L(t) {
        c(1, arguments);
        var e = 1, n = l(t), a = n.getUTCDay(), r = (a < e ? 7 : 0) + a - e;
        return n.setUTCDate(n.getUTCDate() - r), n.setUTCHours(0, 0, 0, 0), n
    }

    function E(t) {
        c(1, arguments);
        var e = l(t), n = e.getUTCFullYear(), a = new Date(0);
        a.setUTCFullYear(n + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
        var r = L(a), o = new Date(0);
        o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0);
        var i = L(o);
        return e.getTime() >= r.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1
    }

    function x(t) {
        c(1, arguments);
        var e = E(t), n = new Date(0);
        n.setUTCFullYear(e, 0, 4), n.setUTCHours(0, 0, 0, 0);
        var a = L(n);
        return a
    }

    var M = 6048e5;

    function D(t, e) {
        c(1, arguments);
        var n = e || {}, a = n.locale, r = a && a.options && a.options.weekStartsOn, o = null == r ? 0 : T(r),
            i = null == n.weekStartsOn ? o : T(n.weekStartsOn);
        if (!(i >= 0 && i <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        var s = l(t), d = s.getUTCDay(), u = (d < i ? 7 : 0) + d - i;
        return s.setUTCDate(s.getUTCDate() - u), s.setUTCHours(0, 0, 0, 0), s
    }

    function I(t, e) {
        c(1, arguments);
        var n = l(t), a = n.getUTCFullYear(), r = e || {}, o = r.locale,
            i = o && o.options && o.options.firstWeekContainsDate, s = null == i ? 1 : T(i),
            d = null == r.firstWeekContainsDate ? s : T(r.firstWeekContainsDate);
        if (!(d >= 1 && d <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
        var u = new Date(0);
        u.setUTCFullYear(a + 1, 0, d), u.setUTCHours(0, 0, 0, 0);
        var m = D(u, e), h = new Date(0);
        h.setUTCFullYear(a, 0, d), h.setUTCHours(0, 0, 0, 0);
        var g = D(h, e);
        return n.getTime() >= m.getTime() ? a + 1 : n.getTime() >= g.getTime() ? a : a - 1
    }

    function q(t, e) {
        c(1, arguments);
        var n = e || {}, a = n.locale, r = a && a.options && a.options.firstWeekContainsDate, o = null == r ? 1 : T(r),
            i = null == n.firstWeekContainsDate ? o : T(n.firstWeekContainsDate), s = I(t, e), d = new Date(0);
        d.setUTCFullYear(s, 0, i), d.setUTCHours(0, 0, 0, 0);
        var u = D(d, e);
        return u
    }

    var N = 6048e5;

    function A(t, e) {
        for (var n = t < 0 ? "-" : "", a = Math.abs(t).toString(); a.length < e;) a = "0" + a;
        return n + a
    }

    const U = function (t, e) {
        var n = t.getUTCFullYear(), a = n > 0 ? n : 1 - n;
        return A("yy" === e ? a % 100 : a, e.length)
    }, O = function (t, e) {
        var n = t.getUTCMonth();
        return "M" === e ? String(n + 1) : A(n + 1, 2)
    }, W = function (t, e) {
        return A(t.getUTCDate(), e.length)
    }, B = function (t, e) {
        return A(t.getUTCHours() % 12 || 12, e.length)
    }, Y = function (t, e) {
        return A(t.getUTCHours(), e.length)
    }, z = function (t, e) {
        return A(t.getUTCMinutes(), e.length)
    }, H = function (t, e) {
        return A(t.getUTCSeconds(), e.length)
    }, F = function (t, e) {
        var n = e.length, a = t.getUTCMilliseconds();
        return A(Math.floor(a * Math.pow(10, n - 3)), e.length)
    };

    function G(t, e) {
        var n = t > 0 ? "-" : "+", a = Math.abs(t), r = Math.floor(a / 60), o = a % 60;
        if (0 === o) return n + String(r);
        var i = e || "";
        return n + String(r) + i + A(o, 2)
    }

    function Q(t, e) {
        return t % 60 == 0 ? (t > 0 ? "-" : "+") + A(Math.abs(t) / 60, 2) : J(t, e)
    }

    function J(t, e) {
        var n = e || "", a = t > 0 ? "-" : "+", r = Math.abs(t);
        return a + A(Math.floor(r / 60), 2) + n + A(r % 60, 2)
    }

    const V = {
        G: function (t, e, n) {
            var a = t.getUTCFullYear() > 0 ? 1 : 0;
            switch (e) {
                case"G":
                case"GG":
                case"GGG":
                    return n.era(a, {width: "abbreviated"});
                case"GGGGG":
                    return n.era(a, {width: "narrow"});
                default:
                    return n.era(a, {width: "wide"})
            }
        }, y: function (t, e, n) {
            if ("yo" === e) {
                var a = t.getUTCFullYear(), r = a > 0 ? a : 1 - a;
                return n.ordinalNumber(r, {unit: "year"})
            }
            return U(t, e)
        }, Y: function (t, e, n, a) {
            var r = I(t, a), o = r > 0 ? r : 1 - r;
            return "YY" === e ? A(o % 100, 2) : "Yo" === e ? n.ordinalNumber(o, {unit: "year"}) : A(o, e.length)
        }, R: function (t, e) {
            return A(E(t), e.length)
        }, u: function (t, e) {
            return A(t.getUTCFullYear(), e.length)
        }, Q: function (t, e, n) {
            var a = Math.ceil((t.getUTCMonth() + 1) / 3);
            switch (e) {
                case"Q":
                    return String(a);
                case"QQ":
                    return A(a, 2);
                case"Qo":
                    return n.ordinalNumber(a, {unit: "quarter"});
                case"QQQ":
                    return n.quarter(a, {width: "abbreviated", context: "formatting"});
                case"QQQQQ":
                    return n.quarter(a, {width: "narrow", context: "formatting"});
                default:
                    return n.quarter(a, {width: "wide", context: "formatting"})
            }
        }, q: function (t, e, n) {
            var a = Math.ceil((t.getUTCMonth() + 1) / 3);
            switch (e) {
                case"q":
                    return String(a);
                case"qq":
                    return A(a, 2);
                case"qo":
                    return n.ordinalNumber(a, {unit: "quarter"});
                case"qqq":
                    return n.quarter(a, {width: "abbreviated", context: "standalone"});
                case"qqqqq":
                    return n.quarter(a, {width: "narrow", context: "standalone"});
                default:
                    return n.quarter(a, {width: "wide", context: "standalone"})
            }
        }, M: function (t, e, n) {
            var a = t.getUTCMonth();
            switch (e) {
                case"M":
                case"MM":
                    return O(t, e);
                case"Mo":
                    return n.ordinalNumber(a + 1, {unit: "month"});
                case"MMM":
                    return n.month(a, {width: "abbreviated", context: "formatting"});
                case"MMMMM":
                    return n.month(a, {width: "narrow", context: "formatting"});
                default:
                    return n.month(a, {width: "wide", context: "formatting"})
            }
        }, L: function (t, e, n) {
            var a = t.getUTCMonth();
            switch (e) {
                case"L":
                    return String(a + 1);
                case"LL":
                    return A(a + 1, 2);
                case"Lo":
                    return n.ordinalNumber(a + 1, {unit: "month"});
                case"LLL":
                    return n.month(a, {width: "abbreviated", context: "standalone"});
                case"LLLLL":
                    return n.month(a, {width: "narrow", context: "standalone"});
                default:
                    return n.month(a, {width: "wide", context: "standalone"})
            }
        }, w: function (t, e, n, a) {
            var r = function (t, e) {
                c(1, arguments);
                var n = l(t), a = D(n, e).getTime() - q(n, e).getTime();
                return Math.round(a / N) + 1
            }(t, a);
            return "wo" === e ? n.ordinalNumber(r, {unit: "week"}) : A(r, e.length)
        }, I: function (t, e, n) {
            var a = function (t) {
                c(1, arguments);
                var e = l(t), n = L(e).getTime() - x(e).getTime();
                return Math.round(n / M) + 1
            }(t);
            return "Io" === e ? n.ordinalNumber(a, {unit: "week"}) : A(a, e.length)
        }, d: function (t, e, n) {
            return "do" === e ? n.ordinalNumber(t.getUTCDate(), {unit: "date"}) : W(t, e)
        }, D: function (t, e, n) {
            var a = function (t) {
                c(1, arguments);
                var e = l(t), n = e.getTime();
                e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
                var a = e.getTime(), r = n - a;
                return Math.floor(r / P) + 1
            }(t);
            return "Do" === e ? n.ordinalNumber(a, {unit: "dayOfYear"}) : A(a, e.length)
        }, E: function (t, e, n) {
            var a = t.getUTCDay();
            switch (e) {
                case"E":
                case"EE":
                case"EEE":
                    return n.day(a, {width: "abbreviated", context: "formatting"});
                case"EEEEE":
                    return n.day(a, {width: "narrow", context: "formatting"});
                case"EEEEEE":
                    return n.day(a, {width: "short", context: "formatting"});
                default:
                    return n.day(a, {width: "wide", context: "formatting"})
            }
        }, e: function (t, e, n, a) {
            var r = t.getUTCDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
            switch (e) {
                case"e":
                    return String(o);
                case"ee":
                    return A(o, 2);
                case"eo":
                    return n.ordinalNumber(o, {unit: "day"});
                case"eee":
                    return n.day(r, {width: "abbreviated", context: "formatting"});
                case"eeeee":
                    return n.day(r, {width: "narrow", context: "formatting"});
                case"eeeeee":
                    return n.day(r, {width: "short", context: "formatting"});
                default:
                    return n.day(r, {width: "wide", context: "formatting"})
            }
        }, c: function (t, e, n, a) {
            var r = t.getUTCDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
            switch (e) {
                case"c":
                    return String(o);
                case"cc":
                    return A(o, e.length);
                case"co":
                    return n.ordinalNumber(o, {unit: "day"});
                case"ccc":
                    return n.day(r, {width: "abbreviated", context: "standalone"});
                case"ccccc":
                    return n.day(r, {width: "narrow", context: "standalone"});
                case"cccccc":
                    return n.day(r, {width: "short", context: "standalone"});
                default:
                    return n.day(r, {width: "wide", context: "standalone"})
            }
        }, i: function (t, e, n) {
            var a = t.getUTCDay(), r = 0 === a ? 7 : a;
            switch (e) {
                case"i":
                    return String(r);
                case"ii":
                    return A(r, e.length);
                case"io":
                    return n.ordinalNumber(r, {unit: "day"});
                case"iii":
                    return n.day(a, {width: "abbreviated", context: "formatting"});
                case"iiiii":
                    return n.day(a, {width: "narrow", context: "formatting"});
                case"iiiiii":
                    return n.day(a, {width: "short", context: "formatting"});
                default:
                    return n.day(a, {width: "wide", context: "formatting"})
            }
        }, a: function (t, e, n) {
            var a = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
            switch (e) {
                case"a":
                case"aa":
                    return n.dayPeriod(a, {width: "abbreviated", context: "formatting"});
                case"aaa":
                    return n.dayPeriod(a, {width: "abbreviated", context: "formatting"}).toLowerCase();
                case"aaaaa":
                    return n.dayPeriod(a, {width: "narrow", context: "formatting"});
                default:
                    return n.dayPeriod(a, {width: "wide", context: "formatting"})
            }
        }, b: function (t, e, n) {
            var a, r = t.getUTCHours();
            switch (a = 12 === r ? "noon" : 0 === r ? "midnight" : r / 12 >= 1 ? "pm" : "am", e) {
                case"b":
                case"bb":
                    return n.dayPeriod(a, {width: "abbreviated", context: "formatting"});
                case"bbb":
                    return n.dayPeriod(a, {width: "abbreviated", context: "formatting"}).toLowerCase();
                case"bbbbb":
                    return n.dayPeriod(a, {width: "narrow", context: "formatting"});
                default:
                    return n.dayPeriod(a, {width: "wide", context: "formatting"})
            }
        }, B: function (t, e, n) {
            var a, r = t.getUTCHours();
            switch (a = r >= 17 ? "evening" : r >= 12 ? "afternoon" : r >= 4 ? "morning" : "night", e) {
                case"B":
                case"BB":
                case"BBB":
                    return n.dayPeriod(a, {width: "abbreviated", context: "formatting"});
                case"BBBBB":
                    return n.dayPeriod(a, {width: "narrow", context: "formatting"});
                default:
                    return n.dayPeriod(a, {width: "wide", context: "formatting"})
            }
        }, h: function (t, e, n) {
            if ("ho" === e) {
                var a = t.getUTCHours() % 12;
                return 0 === a && (a = 12), n.ordinalNumber(a, {unit: "hour"})
            }
            return B(t, e)
        }, H: function (t, e, n) {
            return "Ho" === e ? n.ordinalNumber(t.getUTCHours(), {unit: "hour"}) : Y(t, e)
        }, K: function (t, e, n) {
            var a = t.getUTCHours() % 12;
            return "Ko" === e ? n.ordinalNumber(a, {unit: "hour"}) : A(a, e.length)
        }, k: function (t, e, n) {
            var a = t.getUTCHours();
            return 0 === a && (a = 24), "ko" === e ? n.ordinalNumber(a, {unit: "hour"}) : A(a, e.length)
        }, m: function (t, e, n) {
            return "mo" === e ? n.ordinalNumber(t.getUTCMinutes(), {unit: "minute"}) : z(t, e)
        }, s: function (t, e, n) {
            return "so" === e ? n.ordinalNumber(t.getUTCSeconds(), {unit: "second"}) : H(t, e)
        }, S: function (t, e) {
            return F(t, e)
        }, X: function (t, e, n, a) {
            var r = (a._originalDate || t).getTimezoneOffset();
            if (0 === r) return "Z";
            switch (e) {
                case"X":
                    return Q(r);
                case"XXXX":
                case"XX":
                    return J(r);
                default:
                    return J(r, ":")
            }
        }, x: function (t, e, n, a) {
            var r = (a._originalDate || t).getTimezoneOffset();
            switch (e) {
                case"x":
                    return Q(r);
                case"xxxx":
                case"xx":
                    return J(r);
                default:
                    return J(r, ":")
            }
        }, O: function (t, e, n, a) {
            var r = (a._originalDate || t).getTimezoneOffset();
            switch (e) {
                case"O":
                case"OO":
                case"OOO":
                    return "GMT" + G(r, ":");
                default:
                    return "GMT" + J(r, ":")
            }
        }, z: function (t, e, n, a) {
            var r = (a._originalDate || t).getTimezoneOffset();
            switch (e) {
                case"z":
                case"zz":
                case"zzz":
                    return "GMT" + G(r, ":");
                default:
                    return "GMT" + J(r, ":")
            }
        }, t: function (t, e, n, a) {
            var r = a._originalDate || t;
            return A(Math.floor(r.getTime() / 1e3), e.length)
        }, T: function (t, e, n, a) {
            return A((a._originalDate || t).getTime(), e.length)
        }
    };

    function X(t, e) {
        switch (t) {
            case"P":
                return e.date({width: "short"});
            case"PP":
                return e.date({width: "medium"});
            case"PPP":
                return e.date({width: "long"});
            default:
                return e.date({width: "full"})
        }
    }

    function R(t, e) {
        switch (t) {
            case"p":
                return e.time({width: "short"});
            case"pp":
                return e.time({width: "medium"});
            case"ppp":
                return e.time({width: "long"});
            default:
                return e.time({width: "full"})
        }
    }

    var $ = {
        p: R, P: function (t, e) {
            var n, a = t.match(/(P+)(p+)?/) || [], r = a[1], o = a[2];
            if (!o) return X(t, e);
            switch (r) {
                case"P":
                    n = e.dateTime({width: "short"});
                    break;
                case"PP":
                    n = e.dateTime({width: "medium"});
                    break;
                case"PPP":
                    n = e.dateTime({width: "long"});
                    break;
                default:
                    n = e.dateTime({width: "full"})
            }
            return n.replace("{{date}}", X(r, e)).replace("{{time}}", R(o, e))
        }
    };
    const _ = $;

    function K(t) {
        var e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
        return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime()
    }

    var Z = ["D", "DD"], tt = ["YY", "YYYY"];

    function et(t) {
        return -1 !== Z.indexOf(t)
    }

    function nt(t) {
        return -1 !== tt.indexOf(t)
    }

    function at(t, e, n) {
        if ("YYYY" === t) throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e, "`) for formatting years to the input `").concat(n, "`; see: https://git.io/fxCyr"));
        if ("YY" === t) throw new RangeError("Use `yy` instead of `YY` (in `".concat(e, "`) for formatting years to the input `").concat(n, "`; see: https://git.io/fxCyr"));
        if ("D" === t) throw new RangeError("Use `d` instead of `D` (in `".concat(e, "`) for formatting days of the month to the input `").concat(n, "`; see: https://git.io/fxCyr"));
        if ("DD" === t) throw new RangeError("Use `dd` instead of `DD` (in `".concat(e, "`) for formatting days of the month to the input `").concat(n, "`; see: https://git.io/fxCyr"))
    }

    var rt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ot = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
        it = /^'([^]*?)'?$/, st = /''/g, dt = /[a-zA-Z]/;

    function ct(t, e, n) {
        c(2, arguments);
        var a = String(e), r = n || {}, o = r.locale || S, i = o.options && o.options.firstWeekContainsDate,
            s = null == i ? 1 : T(i), d = null == r.firstWeekContainsDate ? s : T(r.firstWeekContainsDate);
        if (!(d >= 1 && d <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
        var u = o.options && o.options.weekStartsOn, h = null == u ? 0 : T(u),
            g = null == r.weekStartsOn ? h : T(r.weekStartsOn);
        if (!(g >= 0 && g <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
        if (!o.localize) throw new RangeError("locale must contain localize property");
        if (!o.formatLong) throw new RangeError("locale must contain formatLong property");
        var f = l(t);
        if (!m(f)) throw new RangeError("Invalid time value");
        var p = K(f), b = C(f, p), v = {firstWeekContainsDate: d, weekStartsOn: g, locale: o, _originalDate: f},
            w = a.match(ot).map((function (t) {
                var e = t[0];
                return "p" === e || "P" === e ? (0, _[e])(t, o.formatLong, v) : t
            })).join("").match(rt).map((function (n) {
                if ("''" === n) return "'";
                var a = n[0];
                if ("'" === a) return ut(n);
                var i = V[a];
                if (i) return !r.useAdditionalWeekYearTokens && nt(n) && at(n, e, t), !r.useAdditionalDayOfYearTokens && et(n) && at(n, e, t), i(b, n, o.localize, v);
                if (a.match(dt)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + a + "`");
                return n
            })).join("");
        return w
    }

    function ut(t) {
        return t.match(it)[1].replace(st, "'")
    }

    const lt = (() => {
        const t = document.querySelector(".add-task-button"), a = document.querySelector(".add-task-modal"),
            r = document.querySelector(".add-task-modal-overlay "), o = document.querySelector("#add-task-form"),
            i = document.getElementById("task-name-input"), s = document.getElementById("task-description-input"),
            c = document.querySelector(".due-date-picker"), u = document.querySelector(".project-selector"),
            l = document.querySelector(".priority-selector"), m = document.querySelector(".selected-priority > svg"),
            h = document.querySelector(".priority-dropdown-menu"),
            g = document.querySelectorAll(".priority-dropdown-menu > li"),
            f = document.querySelector(".add-task-modal .cancel-button"),
            p = document.querySelector(".add-task-submit-button"), b = () => a.classList.contains("visible"),
            v = (t, e) => {
                const n = document.createElement("option");
                return n.value = t, n.text = t, n.dataset.id = e, n.classList.add("project-selection-option"), n
            }, w = () => {
                const t = e.getProjects();
                for (const e of t) {
                    const t = v(e.name, e.id);
                    u.appendChild(t)
                }
            }, y = () => {
                h.classList.toggle("visible"), l.classList.toggle("selected")
            }, k = () => {
                for (const t of g) t.classList.remove("active-priority")
            }, S = t => {
                const e = document.querySelector(".selected-priority > svg");
                e.parentNode.replaceChild(t, e)
            }, T = () => {
                const t = g[3];
                k(), t.classList.add("active-priority")
            }, j = () => p.disabled = !1, C = () => p.disabled = !0, P = () => {
                D(), I("Add task"), a.classList.toggle("visible"), r.classList.toggle("visible"), u.disabled = !1, o.reset(), C(), h.classList.remove("visible"), l.classList.remove("selected"), (() => {
                    const t = gt.getSelectedButton(), e = "true" === t.dataset.isDefaultProject, n = t.dataset.projectId,
                        a = document.querySelectorAll(".project-selection-option"),
                        r = document.querySelector(".project-selector option[value='inbox']");
                    (e ? r : a[n]).selected = "selected", u.dataset.selectedProjectId = n, u.dataset.isProjectDefault = e
                })(), T(), m.dataset.priority = "4"
            }, L = () => !!i.value.trim(), E = () => {
                L() ? j() : C()
            }, x = () => {
                const t = document.querySelector(".selected-priority > svg");
                let a = u.dataset.selectedProjectId;
                const r = "true" === u.dataset.isProjectDefault;
                r && (a = "0");
                const o = e.getNewTaskId(a, r), d = i.value.trim(), l = s.value.trim(), m = c.valueAsDate;
                return new n(o, d, l, m ? ct(m, "yyyy-MM-dd") : null, m ? ct(m, "dd LLL") : null, a, t.dataset.priority, r)
            }, M = () => {
                const t = x(), n = a.classList.contains("editing");
                if (P(), n) {
                    const n = a.dataset.taskId, r = a.dataset.projectId, o = "true" === a.dataset.isProjectInbox;
                    return e.editTask(n, r, o, t), void d.editTaskButton(n, r, t)
                }
                const r = gt.getSelectedButton(), o = r.dataset.projectId, i = "true" === r.dataset.isDefaultProject,
                    s = t.isProjectInbox, c = o === t.projectId && i === s;
                e.addTaskToProject(t), c && mt.addNewTaskButton(t)
            };
        a.addEventListener("transitionend", (() => {
            b() ? i.focus() : (S(m), T())
        })), t.addEventListener("click", (() => P())), f.addEventListener("click", (() => P())), window.addEventListener("keydown", (t => {
            "Escape" === t.key && b() && P()
        })), l.addEventListener("click", (() => y())), r.addEventListener("click", (t => {
            const e = t.target.offsetParent;
            e && e !== a && e !== r && e !== h && P()
        })), i.addEventListener("input", (() => E())), c.addEventListener("input", (() => E()));
        for (const t of g) t.addEventListener("click", (() => {
            k(), t.classList.add("active-priority");
            const e = t.firstElementChild.cloneNode(!0);
            S(e), y()
        }));
        p.addEventListener("click", (() => M())), window.addEventListener("keydown", (t => {
            "Enter" === t.key && b() && L() && M()
        }));
        const D = () => {
            a.classList.remove("editing")
        }, I = t => {
            p.textContent = t
        };
        return u.addEventListener("input", (() => {
            (() => {
                const t = "true" === u.options[u.selectedIndex].dataset.isProjectDefault;
                u.dataset.isProjectDefault = t
            })(), (() => {
                const t = u.selectedIndex, e = t > 0 ? t - 1 : 0;
                u.dataset.selectedProjectId = e
            })()
        })), c.min = ct(new Date, "yyyy-MM-dd"), w(), {
            addEditClass: () => {
                a.classList.toggle("editing")
            }, addDataAttributesToModal: t => {
                a.dataset.taskId = t.dataset.id, a.dataset.projectId = t.dataset.projectId, a.dataset.isProjectInbox = t.dataset.isProjectInbox
            }, disableProjectSelector: () => {
                u.disabled = !0
            }, getTaskModalData: x, removeEditClass: D, addProjectSelectorOption: t => {
                const n = e.getNewProjectId(), a = v(t, n);
                u.appendChild(a)
            }, addTaskDataToModal: t => {
                const n = e.getTaskObj(t);
                i.value = n.name, s.value = n.description, m.dataset.priority = n.priority;
                const a = n.priority - 1, r = g[a].firstElementChild.cloneNode(!0);
                S(r), c.value = n.dueDate
            }, enableSubmitButton: j, loadProjectSelectorOptions: w, removeProjectSelectorOption: t => {
                const e = document.querySelector(`.project-selection-option[data-id="${t}"]`);
                document.body.contains(e) && e.remove()
            }, toggleModal: P, updateProjectSelectorIds: () => {
                const t = document.querySelectorAll(".project-selection-option");
                for (let e = 0; e < t.length; e++) t[e].dataset.id = e
            }, changeSubmitButtonText: I
        }
    })(), mt = (() => {
        const t = document.querySelector(".editor"), n = document.querySelector(".home-button"),
            a = document.querySelector(".sidebar-button-inbox"), r = e => {
                0 === document.querySelectorAll(".task-button").length && (e => {
                    const n = (t => {
                        const e = "true" === t.dataset.isDefaultProject ? t.dataset.tabName : "Project",
                            n = document.createElement("div"), a = document.createElement("img"),
                            r = document.createElement("div"), o = document.createElement("h4"),
                            i = document.createElement("p");
                        n.classList.add("empty-state-container"), a.classList.add("empty-state-image"), r.classList.add("empty-state-text"), o.classList.add("empty-state-heading"), i.classList.add("empty-state-body"), a.src = {
                            Inbox: "/images/inbox-empty-state.png",
                            Today: "/images/today-empty-state.png",
                            Upcoming: "/images/upcoming-empty-state.png",
                            Project: "/images/project-empty-state.png"
                        }[e];
                        const s = {
                            Inbox: "All clear",
                            Today: "You're all done for the week! #TodoistZero",
                            Upcoming: "Get a clear view of upcoming tasks",
                            Project: "Keep your tasks organized in projects"
                        }[e], d = {
                            Inbox: "Looks like everything's organized in the right place.",
                            Today: "Enjoy the rest of your day.",
                            Upcoming: "All upcoming tasks will show up here.",
                            Project: "Group your tasks by goal or area of your life."
                        }[e];
                        return o.textContent = s, i.textContent = d, r.append(o, i), n.append(a, r), n
                    })(e);
                    t.append(n)
                })(e)
            }, o = (e, n) => {
                (() => {
                    for (; t.firstChild;) t.removeChild(t.lastChild)
                })(), gt.changeTabTitle(n), gt.removeSelectedButtonClass(), gt.addSelectedClassToButton(e), (() => {
                    const e = (() => {
                        const t = document.createElement("div");
                        return t.classList.add("tab-heading"), t
                    })();
                    t.append(e)
                })(), (t => {
                    const e = document.querySelector(".tab-heading"), n = (t => {
                        const e = document.createElement("h2");
                        return e.innerText = t, e.classList.add("tab-title"), e
                    })(t);
                    e.append(n)
                })(n), (() => {
                    const e = document.createElement("button"),
                        n = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        a = document.createElementNS("http://www.w3.org/2000/svg", "path"), r = document.createElement("p");
                    a.setAttribute("d", "M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"), a.setAttribute("fill", "currentColor"), a.setAttribute("fill-rule", "evenodd"), e.classList.add("editor-add-task-button"), n.classList.add("editor-add-task-plus-icon"), r.classList.add("editor-add-task-text"), r.textContent = "Add task", n.appendChild(a), e.append(n, r), t.append(e)
                })(), document.querySelector(".editor-add-task-button").addEventListener("click", (() => lt.toggleModal())), s(e), r(e)
            }, i = e => {
                const n = d.getTaskButton(e), a = document.querySelector(".editor-add-task-button");
                t.insertBefore(n, a), null !== document.querySelector(".empty-state-container") && document.querySelector(".empty-state-container").remove()
            }, s = t => {
                const n = "true" === t.dataset.isDefaultProject, a = parseInt(t.dataset.projectId),
                    r = (n ? e.getDefaultProjects() : e.getProjects())[a].tasks;
                for (const t of r) i(t)
            };
        return (() => {
            const t = document.querySelectorAll(".sidebar-button");
            for (const e of t) e.addEventListener("click", (() => {
                o(e, e.dataset.tabName)
            }))
        })(), n.addEventListener("click", (() => {
            o(a, a.dataset.tabName)
        })), {
            addSidebarVisibleClass: () => t.classList.add("is-sidebar-visible"),
            addNewTaskButton: i,
            changeContent: o,
            removeSidebarVisibleClass: () => t.classList.remove("is-sidebar-visible"),
            loadEmptyStateIfProjectEmpty: r
        }
    })(), ht = (() => {
        const t = document.querySelector(".menu-button > span"), e = () => document.querySelectorAll(".tooltip");
        return (() => {
            const t = (() => {
                const t = e(), n = (() => {
                    const t = e();
                    let n = [];
                    for (const e of t) {
                        const t = e.parentElement;
                        n = [...n, t]
                    }
                    return n
                })(), a = {};
                for (let e = 0; e < t.length; e++) {
                    const r = t[e], o = n[e];
                    a[e] = {tooltip: r, parentButton: o}
                }
                return a
            })(), n = Object.keys(t).length;
            for (let e = 0; e < n; e++) {
                const n = t[e].tooltip, a = t[e].parentButton;
                a.addEventListener("mousedown", (() => {
                    n.classList.remove("visible"), n.classList.contains("clicked") && n.classList.add("clicked")
                })), a.addEventListener("mouseover", (() => {
                    n.classList.contains("clicked") && n.classList.containes("visible") ? n.classList.remove("visible") : n.classList.add("visible")
                })), a.addEventListener("mouseout", (() => {
                    n.classList.contains("clicked") && n.classList.remove("clicked"), n.classList.remove("visible")
                }))
            }
        })(), {
            changeMenuTooltipTextOpen: () => t.textContent = "Open menu",
            changeMenuTooltipTextClose: () => t.textContent = "Close menu"
        }
    })(), gt = (() => {
        const t = document.querySelector(".sidebar"), e = document.querySelector(".sidebar-overlay"),
            n = document.querySelector(".editor"), a = document.querySelector(".projects-list-container"), r = () => {
                t.classList.add("is-visible"), mt.addSidebarVisibleClass(), ht.changeMenuTooltipTextClose()
            };
        return (() => {
            const e = document.querySelectorAll(".menu-button");
            for (const a of e) a.addEventListener("click", (() => {
                t.classList.toggle("is-visible"), n.classList.toggle("is-sidebar-visible"), document.querySelector(".sidebar-overlay").classList.toggle("is-visible"), t.classList.contains("is-visible") ? ht.changeMenuTooltipTextClose() : ht.changeMenuTooltipTextOpen()
            }))
        })(), (() => {
            const t = document.querySelector(".sidebar-projects-button"),
                e = document.querySelector(".sidebar-projects-arrow-icon");
            t.addEventListener("click", (() => {
                e.classList.toggle("expanded"), a.classList.toggle("expanded")
            }))
        })(), window.innerWidth > 750 && r(), window.addEventListener("resize", (() => {
            const n = t.classList.contains("is-visible"), a = e.classList.contains("is-visible"), o = window.innerWidth;
            if (!a) return n && o <= 750 ? (t.classList.remove("is-visible"), mt.removeSidebarVisibleClass(), void ht.changeMenuTooltipTextOpen()) : void (!n && o > 750 && r())
        })), (() => {
            const t = document.querySelectorAll(".sidebar-button");
            for (const e of t) e.addEventListener("click", (() => {
                d.updateTaskButtonIds(), d.updateTaskButtonDefaultProjectTaskIds()
            }))
        })(), {
            changeTabTitle: t => document.title = `${t}: ToDo-List`,
            addSelectedClassToButton: t => t.classList.add("selected"),
            removeSelectedButtonClass: () => {
                const t = document.querySelectorAll(".sidebar-button");
                for (const e of t) e.classList.contains("selected") && e.classList.remove("selected")
            },
            getSelectedButton: () => document.querySelector(".sidebar-button.selected"),
            selectDefaultTab: () => {
                const t = document.querySelector(".sidebar-button-inbox"), e = t.dataset.tabName;
                mt.changeContent(t, e)
            }
        }
    })(), ft = (() => {
        const t = document.querySelector(".sidebar-button-inbox"), n = t => {
            const n = ((t, e) => {
                const n = document.createElement("button"), a = document.createElement("span"), r = o();
                return r.classList.add("delete-project-icon"), n.classList.add("project-button", "sidebar-button", "tab-link"), a.classList.add("project-name"), n.dataset.tabName = e, a.textContent = e, n.append(t, a, r), n
            })(s(), t);
            (t => {
                const e = document.querySelector("#projects-list"), n = (t => {
                    const e = document.createElement("li");
                    return e.appendChild(t), e
                })(t);
                e.appendChild(n)
            })(n), (t => {
                const e = document.querySelectorAll(".project-button").length - 1;
                t.dataset.projectId = e
            })(n), (t => {
                const n = t.dataset.tabName, a = t.childNodes[2];
                t.addEventListener("click", (e => e.target === t && mt.changeContent(e.target, n))), a.addEventListener("click", (() => {
                    gt.selectDefaultTab();
                    const n = t.dataset.projectId;
                    (t => {
                        t.parentNode.remove()
                    })(t), lt.removeProjectSelectorOption(n), e.removeProject(n), (() => {
                        const t = document.querySelectorAll(".project-button");
                        for (let e = 0; e < t.length; e++) t[e].dataset.projectId = e
                    })(), lt.updateProjectSelectorIds(), e.updateProjectIds(), e.updateTaskProjectIds()
                }))
            })(n)
        };
        return (() => {
            const t = e.getProjects();
            for (let e = 0; e < t.length; e++) {
                const a = t[e].name;
                n(a)
            }
        })(), mt.changeContent(t, t.dataset.tabName), {addProjectButton: n}
    })();
    (() => {
        const n = document.querySelector(".add-project-button"), a = document.querySelector(".add-project-modal"),
            r = document.querySelector("#add-project-form"), o = document.querySelector("#project_name"),
            i = document.querySelector(".add-project-modal .cancel-button"),
            s = document.querySelector(".add-project-submit-button"),
            d = document.querySelector(".add-project-modal-overlay "), c = () => s.disabled = !0, u = () => {
                d.classList.toggle("visible"), a.classList.toggle("visible"), r.reset(), c(), o.focus()
            }, l = () => {
                const n = o.value, a = e.getNewProjectId(), r = new t(a, n, []);
                lt.addProjectSelectorOption(n), e.addProject(r), ft.addProjectButton(n);
                const i = document.querySelector(`.project-button[data-project-id="${a}"]`);
                mt.changeContent(i, n), u()
            };
        n.addEventListener("mouseup", (() => u())), i.addEventListener("click", (() => u())), o.addEventListener("input", (() => {
            o.value.replace(/\s/g, "") ? s.disabled = !1 : c()
        })), s.addEventListener("click", (() => l())), r.addEventListener("submit", (t => {
            t.preventDefault(), l()
        }))
    })(), document.querySelector(".reset-data-button").addEventListener("click", (() => {
        localStorage.clear(), location.reload()
    }))
})();