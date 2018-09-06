<template>
    <div></div>
</template>

<script lang="ts">

import { Prop as prop, Watch as watch } from "vue-property-decorator";

import Component from "vue-class-component";
import Vue from "vue";
import axios from "axios";
import * as request from "request";
import { Test } from "../../models/test";

@Component({

    mounted() {
        const vm = this;
        axios.get("http://localhost:3002/test")
            .then((response: any) => {
                // handle success
                const data = new Test(response.data);
                console.log(data);

            })
            .catch((error: any) => {
                // tslint:disable-next-line:no-console
                console.log(error);
            })
            .then((data: any) => {
                // always executed
            });
    },
})
export default class TestAjaxComponent extends Vue {

}
</script>

<style></style>