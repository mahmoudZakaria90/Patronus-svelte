<script lang="ts">
  import errorStore from '../../stores/errorStore';
</script>

<div class="error">Patronus, {$errorStore}</div>

<style>
  .error {
    color: #ffa6a6;
    text-align: center;
  }
</style>
