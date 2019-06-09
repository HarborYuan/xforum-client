<template>
  <div>
    <div id="bubbles">
      <div v-if="this.blued" class="blocker">
        <div class="bubbleblue">{{ msg.content }}</div>
      </div>
      <div v-else class="blocker">
        <div class="bubblegrey">{{ msg.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageBubble',
    props: ['correspondent', 'msg'],
    computed: {
      blued() {
        return this.correspondent === this.msg.sendee;
      },
    },
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
