import { h, Component } from "@stencil/core";

@Component({
  tag: 'pk-spinner',
  styleUrl: './spinner.scss',
  shadow: true,
})
export class Spinner {
  render() {
    return <div class="lds-hourglass"></div>;
  }
}