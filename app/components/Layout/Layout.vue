<template>
  <div class="Layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
@Component
export default class LayoutComponent extends Vue { }
</script>

<style src="./Layout.css"></style>