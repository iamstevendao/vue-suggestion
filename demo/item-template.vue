<template lang="pug">
div
  b \#{{item.id}} 
  span {{ item.name }}
  br
  span {{item.description}}
</template>

<script>
export default {
  props: {
    item: { required: true }
  }
}
</script>
