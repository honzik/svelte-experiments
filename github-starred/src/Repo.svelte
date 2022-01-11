<script>
    export let name;
    export let url;
    export let id;
    export let description;
    export let stars;
</script>

<div class="repo">
    <h3><code>{name}</code></h3>
    <div class="props">
        <span class="link"><a href={url}>GitHub link</a></span>
        <span class="stars">{stars}</span>
        <span class="fav">Fav</span>
    </div>
    <div class="desc">
        {description ?? '---'}
    </div>
</div>

<style>
    .repo {
        width: 30%;
        margin: 1em 0;
        background: #f0f0f0;
        border-radius: 5px;
        padding: 0.5em;
    }
    h3 {
        margin: 5px 0;
    }
    .props {
        padding: 0 2em;
        display: flex;
        justify-content: space-between;
    }
    .desc {
        padding: 1em 3em;
        font-size: 0.8rem;
        color: gray;
    }
</style>