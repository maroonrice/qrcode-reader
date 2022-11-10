<template>

<div class="wrapper">

<nav class="main-header navbar navbar-expand navbar-white navbar-light">
<ul class="navbar-nav">
<li class="nav-item">
<a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
</li>
<li class="nav-item d-none d-sm-inline-block">
<router-link to="/" class="nav-link">Menu</router-link>
</li>
</ul>
</nav>

<aside class="main-sidebar sidebar-dark-primary elevation-4">

<router-link to="/" class="brand-link">
<img src="/vite.svg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
<span class="brand-text font-weight-light">QR Code Reader</span>
</router-link>

<div class="sidebar">
<nav class="mt-2">
<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

<li class="nav-item">
<router-link to="/page/camera" class="nav-link">
<i class="nav-icon fas fa-th"></i>
<p>
Camera
<span class="right badge badge-danger">New</span>
</p>
</router-link>
</li>

</ul>
</nav>
</div>
</aside>
<router-view></router-view>
<footer class="main-footer">
<strong>Copyright &copy; 2022 <a href="#">Maroon Rice</a>.</strong>
All rights reserved.
<div class="float-right d-none d-sm-inline-block">
<b>Version</b> 3.2.0
</div>
</footer>

<aside class="control-sidebar control-sidebar-dark">
</aside>

</div>
</template>

<script>
</script>
