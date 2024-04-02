<script lang="ts">
  import logo from '../assets/logo.png';

  import AuthSuccess from './Auth/AuthSuccess.svelte';
</script>

<AuthSuccess />
<img class="logo gv-center" src={logo} alt="" />
<small class="gv-center">Your friendly :) chat interaction system</small>

<style>
  .logo {
    margin: 15px auto;
    border-radius: 10px;
    width: 45px;
  }
</style>
