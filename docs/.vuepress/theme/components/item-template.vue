<template>
  <div>
    <b>#{{ item.id }}&nbsp;</b>
    <span>{{ item.name }}</span>
    <br />
    <span>{{ item.description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>
