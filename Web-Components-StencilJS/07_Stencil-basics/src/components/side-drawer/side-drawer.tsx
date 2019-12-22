import { h, Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'pk-side-drawer',
  styleUrl: './side-drawer.scss',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true }) menutitle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  async open() {
    this.opened = true;
  }
  
  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-info">
          <h3>Contact information</h3>
          <p>You can reach us via phone or email:</p>
          <ul>
            <li>Phone: 00122423423</li>
            <li>something@example.com</li>
          </ul>
        </div>
      );
    }

    return [
      <div 
        class="backdrop"
        onClick={() => this.onCloseDrawer()}>
      </div>,
      
      <aside>
        <header>
          <h1>{ this.menutitle }</h1>
          <button onClick={() => this.onCloseDrawer()}>x</button>
        </header>
        <section id="tabs">
          <button 
            class={!this.showContactInfo ? 'active' : ''} 
            onClick={() => this.onContentChange('nav')}>
              Navigaton
          </button>
          <button 
            class={this.showContactInfo ? 'active' : ''}
            onClick={() => this.onContentChange('contact')}>
              Contact
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>    
    ];
  }
}