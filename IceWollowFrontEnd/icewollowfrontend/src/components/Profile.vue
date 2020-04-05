<template>
  <div class="container fancy-border pb-2 ">
    <div class="text-light row mt-2" v-if="user != null">
      <div class="col-1">
        <img src="@/assets/logo.png" alt="logo" class="small-rounded-icon" />
      </div>
      <div class="col">
        <div class="row">
          <div class="col-12">
            <div class="float-left ml-3 font-weight-bold">
              {{ user.displayName }}
            </div>
          </div>
          <div class="col-4 ml-1">
            <div class="unselectable">online</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-width: 300px;
  width: 300px;
}

.fancy-border {
  border-top: solid 1px #a6a6a6;
}
</style>

<script>
export default {
  props: ["user"]
};
</script>
