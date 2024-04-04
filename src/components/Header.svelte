<script lang="ts">
  import logo from '../assets/logo.png';
  import AuthError from './Auth/AuthError.svelte';
  import AuthSuccess from './Auth/AuthSuccess.svelte';
</script>

<AuthSuccess />
<AuthError />
<img class="logo gv-center" src={logo} alt="" />
<small class="gv-center">Your friendly :) chat interaction system</small>

<style>
  .logo {
    margin: 15px auto;
    border-radius: 10px;
    width: 45px;
  }
</style>
