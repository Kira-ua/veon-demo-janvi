// Small progressive enhancements. Without this script every link still works: anchors, tel:, messengers, Altegio.
const mobile = window.matchMedia("(max-width: 59.99rem)");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Dialogs: the mobile menu and the contact sheet (native <dialog>: focus stays inside, Esc closes). */
function setupDialog(dialog: HTMLDialogElement | null, openers: NodeListOf<HTMLElement>, onlyMobile: boolean) {
  if (!dialog || typeof dialog.showModal !== "function") return;
  let lastOpener: HTMLElement | null = null;
  openers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (onlyMobile && !mobile.matches) return; // desktop: the plain anchor to #booking
      e.preventDefault();
      lastOpener = btn;
      dialog.showModal();
      btn.setAttribute("aria-expanded", "true");
    });
  });
  dialog.addEventListener("close", () => {
    openers.forEach((b) => b.setAttribute("aria-expanded", "false"));
    lastOpener?.focus({ preventScroll: true });
  });
  dialog.querySelectorAll<HTMLElement>("[data-dialog-close]").forEach((b) => b.addEventListener("click", () => dialog.close()));
  dialog.querySelectorAll<HTMLAnchorElement>("[data-dialog-link]").forEach((a) =>
    a.addEventListener("click", () => { lastOpener = null; dialog.close(); }),
  );
  // A tap on the backdrop closes the dialog.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
}
setupDialog(document.querySelector<HTMLDialogElement>("#menu"), document.querySelectorAll<HTMLElement>("[data-menu-open]"), false);
setupDialog(document.querySelector<HTMLDialogElement>("#contact"), document.querySelectorAll<HTMLElement>("[data-contact-open]"), true);

/* Services: on a phone the directions become an accordion (first open); on a wide screen all are open. */
const dirs = Array.from(document.querySelectorAll<HTMLElement>("[data-dir]"));
function collapse(dir: HTMLElement, closed: boolean) {
  dir.toggleAttribute("data-collapsed", closed);
  dir.querySelector("[data-dir-toggle]")?.setAttribute("aria-expanded", String(!closed));
}
function layoutDirs() {
  dirs.forEach((d, i) => collapse(d, mobile.matches && i !== 0));
}
dirs.forEach((d) => {
  d.querySelector("[data-dir-toggle]")?.addEventListener("click", () => collapse(d, !d.hasAttribute("data-collapsed")));
});
layoutDirs();
mobile.addEventListener("change", layoutDirs);

/* A concern ("Судини") leads to its procedure: open its direction, then mark the procedure with the ochre stroke. */
function markProcedure(id: string) {
  const item = document.getElementById(id);
  if (!item) return;
  const dir = item.closest<HTMLElement>("[data-dir]");
  if (dir && dir.hasAttribute("data-collapsed")) collapse(dir, false);
  document.querySelectorAll(".mark.is-marked[data-procedure]").forEach((m) => m.classList.remove("is-marked"));
  const mark = item.querySelector<HTMLElement>("[data-procedure]");
  if (mark) window.setTimeout(() => mark.classList.add("is-marked"), reduce.matches ? 0 : 360);
}
document.querySelectorAll<HTMLAnchorElement>("[data-concern]").forEach((a) => {
  a.addEventListener("click", () => {
    const id = a.hash.slice(1);
    markProcedure(id);
    document.querySelectorAll("[data-concern][aria-current]").forEach((c) => c.removeAttribute("aria-current"));
    document.querySelectorAll<HTMLAnchorElement>(`[data-concern][href="#${id}"]`).forEach((c) => c.setAttribute("aria-current", "true"));
  });
});
if (location.hash.startsWith("#p-")) markProcedure(location.hash.slice(1));

/* Header: the section in view gets the stroke under its menu item. */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
if ("IntersectionObserver" in window && navLinks.length) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((l) => (l.dataset.nav === e.target.id ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["hero", ...navLinks.map((l) => l.dataset.nav || "")].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* Mobile bottom bar: shown once the first screen has scrolled away. */
const bar = document.querySelector<HTMLElement>("[data-bar]");
const hero = document.getElementById("hero");
if (bar && hero && "IntersectionObserver" in window) {
  bar.setAttribute("data-ready", "");
  new IntersectionObserver(([e]) => bar.toggleAttribute("data-shown", !e.isIntersecting), { threshold: 0 }).observe(hero);
}

/* Sunday: the one branch open on Sunday gets its stroke drawn once the branches are in view. */
const sunday = document.querySelectorAll<HTMLElement>("[data-sunday]");
if (sunday.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-marked"); io.unobserve(e.target); }
  }, { threshold: 1 });
  sunday.forEach((s) => io.observe(s));
} else sunday.forEach((s) => s.classList.add("is-marked"));
