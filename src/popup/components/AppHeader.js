/**
 * perma-extension
 * @module popup/components/IntroHeader
 * @author The Harvard Library Innovation Lab
 * @license MIT
 * @description `<app-header>` custom element. 
 */
// @ts-check

import { BROWSER } from "../../constants/index.js";

/**
 * Custom Element: `<app-header>`.
 * 
 * Available HTML attributes: 
 * - `tab-url`: Url of the current tab.
 * - `tab-title`: Title of the current tab.
 */
export class AppHeader extends HTMLElement {
  /**
   * Defines which HTML attributes should be observed by `attributeChangedCallback`.
   */
   static get observedAttributes() { 
    return ["tab-url", "tab-title"];
  }

  /**
   * Upon injection into the DOM:
   * - First render.
   */
  connectedCallback() {
    this.renderInnerHTML();
  }

  /**
   * On HTML attribute update:
   * - Re-render if value changed. 
   * 
   * @param {string} name 
   * @param {*} oldValue 
   * @param {*} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if(newValue !== oldValue) {
      this.renderInnerHTML();
    }
  }

  /**
   * Assembles a template and injects it into `innerHTML`
   */
  renderInnerHTML() {
    const getMessage = BROWSER.i18n.getMessage;
    const getAttribute = this.getAttribute.bind(this);

    // Heading
    this.innerHTML = /*html*/`
    <h1>
      <a href="${getMessage("app_header_link_url")}" 
         target="_blank" 
         rel="noopener noreferer" 
         title="${getMessage("app_header_link_label")}" 
         aria-label="${getMessage("app_header_link_label")}">
        <img src="../assets/infinity-orange.svg" alt="Perma.cc"/>
      </a>
      
      <span>${getMessage("app_header_title")}<span>
    </h1>
    
    <div>
      <strong>${getAttribute("tab-title")}</strong>
      <span>${getAttribute("tab-url")}</span>
    </div>
    `;
  }

}
customElements.define('app-header', AppHeader);