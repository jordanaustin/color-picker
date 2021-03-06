import {html} from '@polymer/polymer';

const $_documentContainer = html`
<dom-module id="material-color-picker-color-slider" theme-for="color-slider">
  <template>
    <style>
      :host {
        --color-slider-size: calc(36px / 2);
        --color-slider-handle-size: var(--color-slider-size);

        height: var(--color-slider-size); 
        margin: calc(4px / 2) 0;
      }

      [part="canvas"] {
        border-radius: 2px;
        --responsive-canvas-background-style: var(--color-picker-alpha-checkerboard-background-style);
      }

      [part="handle"] {
        width: var(--color-slider-size);
        height: var(--color-slider-size);

        margin-left: calc(var(--color-slider-handle-size) * -0.5);
        margin-top: calc(var(--color-slider-handle-size) * -0.5);
        top: calc(var(--color-slider-handle-size) / 2);
        left: calc(var(--color-slider-handle-size) / 2);

        box-shadow: var(--material-shadow-elevation-2dp);

        border-radius: 50%;

        transition: transform .2s cubic-bezier(.12, .32, .54, 1);
        will-change: transform;
      }

      [part="background-reset"] {
        border-color: var(--material-background-color);
      }

      [part="background"] {
        content: "";
      }

      [part="background"],
      [part="background-reset"] {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        transition: border-width 0.15s cubic-bezier(.12, .32, .54, 1), border-color 0.15s;
        will-change: border-width, border-color;

        border: calc(var(--color-slider-handle-size) / 2) solid var(--material-background-color);
        box-sizing: border-box;
      }

      [part="handle"][active] [part="background"],
      [part="handle"][active] [part="background-reset"] {
        border-width: 4px;
      }

      [part="handle"]::before {
        content: "\2003";
        color: transparent;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: var(--material-primary-color);
        transform: scale(2.4);
        opacity: 0;
        transition: transform 0.1s, opacity 0.8s;
        will-change: transform, opacity;
      }

      [part="handle"][active]::before {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }

      [part="handle"]::after {
        content: "";
        width: 0;
        height: 0;
        border: 6px solid var(--material-primary-color);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: 0.25s transform;
        will-change: transform;
        background-clip: content-box;
      }

      [part="handle"]:not([active]):hover::after {
        transform: translate(-50%, -50%) scale(1);
      }

      :host([focus-ring]) [part="handle"]::before {
        transform: scale(2.5);
        transition-duration: 0s;
        opacity: 0.15;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) [part="handle"] {
        box-shadow: none;
      }

      :host([disabled]) [part="background"] {
        border-color: var(--material-disabled-color);
      }
    </style>
  </template>
</dom-module>

<dom-module id="material-color-picker-sl-slider" theme-for="sl-slider">
  <template>
    <style>
      :host {
        height: calc(var(--color-slider-size) * 8);
      }
    </style>
  </template>
</dom-module>
`;
document.head.appendChild($_documentContainer.content);
