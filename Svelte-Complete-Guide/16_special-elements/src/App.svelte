<script>

// DYNAMIC COMPONENTS - svelte:component
    import Product from './Product.svelte';
    import CartItem from './CartItem.svelte';

    const product = {cmp: Product, title: 'Test product', id: 'p1'};
    const cartItem = {cmp: CartItem, title: 'Another product', id: 'p2'};

    let renderedComponent = product;

    function toggle() {
        if (renderedComponent === product) {
            renderedComponent = cartItem;
        } else {
            renderedComponent = product;
        }
    }

// RECURSIVE COMPONENTS - svelte:self
    import FamilyNode from './FamilyNode.svelte';

    let familyStructure = [
        {isParent: true, name: 'Crhis', children: [
            {isParent: true, name: 'Moe', children: [
                {isParent: false, name: 'Julie'}
            ]}
        ]},
        {isParent: false, name: 'Anna'},
    ];

// WINDOW  - svelte:window
    let y;
    $: console.log(y);

    const checkKey = (event) => {
        if (event.which === 90) {
            console.log('Z pressed');
        }
    }

// BODY - svelte:body
    const onMouseEnter = (event) => {
        console.log('Mouse Entered the Body');
    }

// HEAD - svelte:head
    let title = 'My App';
    function switchTitle() {
        title = 'A New Title';
    }

</script>


<style>
    div {
        height: 500px;
    }
</style>


<!-- svelte:component Dinamically renders one of each similar components without if statements in markup -->
<button on:click={toggle}>Toggle Display</button>
<svelte:component 
    this={renderedComponent.cmp} 
    title={renderedComponent.title} 
    id={renderedComponent.id} />


<hr>
<!-- svelte:self Recursively renders the component you're in (see FamilyNode.svelte) -->
{#each familyStructure as member}
    <FamilyNode member={member} />
{/each}


<hr>
<!-- svelte:window Can interact with the window object, add event listeners, bind properties -->
<svelte:window on:keydown={checkKey} bind:scrollY={y} />
<div>
    <p>Content...</p>
    <p>Scroll down...</p>
</div>


<hr>
<!-- svelte:body Can interact with the document.body object -->
<svelte:body on:mouseenter={onMouseEnter} />


<hr>
<!-- svelte:head Can access the head of the HTML document and set all meta/link/etc tags-->
<svelte:head>
    <title>{title}</title>
</svelte:head>
<button on:click={switchTitle}>Switch Title</button>