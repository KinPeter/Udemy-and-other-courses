/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface PkSideDrawer {
    'menutitle': string;
    'open': () => Promise<void>;
    'opened': boolean;
  }
}

declare global {


  interface HTMLPkSideDrawerElement extends Components.PkSideDrawer, HTMLStencilElement {}
  var HTMLPkSideDrawerElement: {
    prototype: HTMLPkSideDrawerElement;
    new (): HTMLPkSideDrawerElement;
  };
  interface HTMLElementTagNameMap {
    'pk-side-drawer': HTMLPkSideDrawerElement;
  }
}

declare namespace LocalJSX {
  interface PkSideDrawer {
    'menutitle'?: string;
    'opened'?: boolean;
  }

  interface IntrinsicElements {
    'pk-side-drawer': PkSideDrawer;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pk-side-drawer': LocalJSX.PkSideDrawer & JSXBase.HTMLAttributes<HTMLPkSideDrawerElement>;
    }
  }
}


