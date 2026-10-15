/**
 * Contato da proposta.
 * Preencha antes de apresentar o site.
 * email: "nome@email.com"
 * whatsapp: apenas números, com DDI. Ex.: "5581999999999"
 */
const CONTACT = {
  email: "",
  whatsapp: "",
};

const CONTACT_SUBJECT = "Porto Geek Experience — vamos conversar sobre o projeto";
const CONTACT_BODY =
  "Olá,\n\nGostaria de conversar sobre a proposta da Porto Geek Experience e alinhar, com a Secretaria de Turismo de Ipojuca, o melhor formato para uma apresentação.\n\n";

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

function closeMenu() {
  menu.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

links.forEach((link) => link.addEventListener("click", closeMenu));

const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const sections = ["experiencia", "turismo", "parcerias", "contato"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setCurrent = () => {
  const mark = window.scrollY + 120;
  let current = "";
  sections.forEach((section) => {
    if (section.offsetTop <= mark) current = section.id;
  });
  links.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
};

setCurrent();
window.addEventListener("scroll", setCurrent, { passive: true });

const mailHref = CONTACT.email
  ? `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`
  : `mailto:?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;

document.querySelectorAll("[data-contact='email']").forEach((node) => {
  node.href = mailHref;
});

const whatsapp = document.querySelector("[data-contact='whatsapp']");
if (CONTACT.whatsapp && whatsapp) {
  whatsapp.hidden = false;
  whatsapp.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT_BODY)}`;
}
