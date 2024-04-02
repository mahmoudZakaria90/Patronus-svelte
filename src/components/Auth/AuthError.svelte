<script lang="ts">
  import errorStore from '../../stores/errorStore';
  import grant from '../../assets/grant.png';
</script>

{#if $errorStore === 401}
  <img src={grant} alt="" />
{:else if typeof $errorStore === 'function'}
  <div class="error">Patronus, {$errorStore}</div>
{/if}

<style>
  .error {
    color: #ffa6a6;
    text-align: center;
  }
</style>
