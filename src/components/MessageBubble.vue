<template>
  <div>
    <div id="bubbles">
      <div v-if="this.sender" class="blocker">
        <div class="bubbleblue">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt rutrum lacus vitae hendrerit. Morbi id tellus eu justo porttitor tempus non id felis. Ut interdum justo quis elementum imperdiet. Nulla non ex augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc vitae auctor lorem, in tristique enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Vestibulum porttitor erat nec tellus pharetra efficitur.</div>
      </div>
      <div v-else class="blocker">
        <div class="bubblegrey">我好</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageBubble',
    props: ['sender'],
  };
</script>

<style lang="stylus">
  .blocker
    background-color transparent
    display inline-block
    width 100%


  .bubbleblue
    float right
    max-width 60%
    background-color #1e68ee
    color #f8f8f8
    width content-box
    padding 5px 12px 5px 12px
    margin 10px 10px 10px 10px
    border-radius 16px

  .bubblegrey
    background-color hsla(0,0%,100%,0.8)
    color black
    float left
    width content-box
    max-width 60%
    padding 5px 12px 5px 12px
    margin 10px 10px 10px 10px
    border-radius 16px

</style>
