<script>
/**
 * Stat component -- specify the widget icon, title and value.
 */
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    orders: {
      type: Number,
      default: 0
    },
    sum: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>

<template>
  <div class="card mini-stats-wid">
    <div class="card-body">
      <div class="media">
        <div class="media-body">
          <p class="text-muted fw-medium mb-2">{{ name }}</p>
          <h4 class="mb-0">{{ orders }} Orders</h4>
          <h4 class="mb-0">{{ sum.toFixed(2) }} GEL</h4>
        </div>

        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title">
            <i :class="`${icon} font-size-24`"></i>
          </span>
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card -->
</template>