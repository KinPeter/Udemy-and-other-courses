import { h, Component, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { alphaVantageApiKey } from '../../keys';

const apiUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';

@Component({
  tag: 'pk-stock-price',
  styleUrl: './stock-price.scss',
  shadow: true
})
export class StockPrice {

  @Element() el: HTMLElement; // refers to the whole component's element
  public stockInput: HTMLInputElement; // use with ref= attribute

  @State() fetchedPrice: string;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({mutable: true, reflect: true}) stockSymbol: string; // on html automatically parsed as stock-symbol
  @Watch('stockSymbol') // watches for changes in the given prop and executes the method
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue.toUpperCase();
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbol = this.stockUserInput.trim().toUpperCase();
  }

  // LIFECYCLE HOOKS: 
  componentWillLoad() {
    console.log('[Lifecycle]: Component Will Load', this.stockSymbol);
  }  
  componentDidLoad() {
    console.log('[Lifecycle]: Component Did Load', this.stockSymbol);
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol.toUpperCase();
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }  
  componentWillUpdate() {
    console.log('[Lifecycle]: Component Will Update - render() will run');
  }
  componentDidUpdate() {
    console.log('[Lifecycle]: Component Did Update - render() done');
  }
  componentDidUnload() {
    console.log('[Lifecycle]: Component Did Unload - cleanup...');
  }

  @Listen('pkSymbolSelected', { target: 'body' }) // listens to the event emitted by an other component globally (bubbles up to <body>)
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail.toUpperCase();
      this.stockInputValid = true;
    }
  }
  
  private fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(`${apiUrl}&symbol=${stockSymbol}&apikey=${alphaVantageApiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data['Error Message']) {
          throw new Error('Invalid symbol!');
        }
        this.error = null;
        this.fetchedPrice = data['Global Quote']['05. price'];
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.fetchedPrice = null;
        this.loading = false;
      });
  }

  hostData() { // special method that is executed whenever render is executed
    return {
      class: this.error ? 'hydrated error' : 'hydrated', // will put error class onto the component element itself
    };
  }

  render() {
    let dataContent = <p>Please enter a symbol!</p>;
    if (this.error) {
      dataContent = <p>{ this.error }</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${ this.fetchedPrice }</p>;
    }
    if (this.loading) {
      dataContent = <pk-spinner></pk-spinner>
    }
    return [
      <form onSubmit={(event) => this.onFetchStockPrice(event)}>
        <input 
          type="text" 
          id="stock-symbol" 
          value={this.stockUserInput}
          onInput={(event) => {this.onUserInput(event)}}
          ref={(el) => {this.stockInput = el}}/>
        <button 
          type="submit"
          disabled={!this.stockInputValid || this.loading}>
            Fetch
        </button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }
}
