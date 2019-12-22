import { h, Component, State, Event, EventEmitter } from "@stencil/core";
import { alphaVantageApiKey } from '../../keys';

interface StockResult {
  symbol: string; 
  name: string;
}

@Component({
  tag: 'pk-stock-finder',
  styleUrl: './stock-finder.scss',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: StockResult[] = [];
  @State() loading = false;

  @Event({ bubbles: true, composed: true }) pkSymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${alphaVantageApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.searchResults = data['bestMatches'].map((match) => {
        return {
          name: match['2. name'],
          symbol: match['1. symbol'],
        };
      });
      this.loading = false;
    })
    .catch((err) => {
      console.log(err);
      this.loading = false;
    });
  }

  onSelectSymbol(symbol: string) {
    this.pkSymbolSelected.emit(symbol);
  }

  render() {
    let content = (
      <ul>
        {this.searchResults.map((result) => (
          <li onClick={() => this.onSelectSymbol(result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      content = <pk-spinner></pk-spinner>;
    }
    return [
      <form onSubmit={(event) => this.onFindStocks(event)}>
        <input
          type="text"
          id="stock-symbol"
          ref={(el) => { this.stockNameInput = el }} />
        <button
          type="submit">
          Find
        </button>
      </form>,
      content
    ];
  }
}