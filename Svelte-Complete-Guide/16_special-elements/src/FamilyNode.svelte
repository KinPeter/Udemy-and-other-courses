<script>
    export let member;

</script>

<div style="margin:2rem">
    <h3>{member.name}</h3>
    {#if member.isParent}
        {#each member.children as child}
            <svelte:self member={child} />
        {/each}
    {/if}
</div>

