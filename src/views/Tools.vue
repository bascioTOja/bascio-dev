<template>
  <div id="content" class="main">
    <div class="container">
      <div class="content-header row">
        <div class="btn btn-link">
          <a href="{% url 'tools:index' %}">bascio<span class="green-text">.dev</span></a>
        </div>
        <span class="content-header-title"></span>
        {% if user.is_authenticated %}
        <div>
          <a href="{% url 'logout' %}" class="btn btn-link" data-toggle="tooltip" title="Log out">
            <span class="material-icons-two-tone">logout</span>
          </a>
          <a href="{ url 'account' }" class="btn btn-primary">
            <span class="material-icons-two-tone">account_circle</span> Account
          </a>
        </div>
        <a href="{% url 'login' %}" class="btn btn-primary ">
          <span class="material-icons-two-tone">login</span> Log in
        </a>
      </div>
      <div class="content">
        <ToolCard v-for="tool in tools" :card="tool" :key="tool.code" />
      </div>
    </div>
  </div>
</template>

<script>
import ToolCard from "@/components/tools/ToolCard.vue";
import toolsData from "@/api/tools.json";

export default {
  components: {
    ToolCard
  },
  data() {
    return {
      tools: [],
    };
  },
  mounted() {
    this.tools = toolsData;
  }
}

</script>

<style scoped lang="scss">
  .container {
    margin-top: 5vh;
    min-height: 85vh;
    background-color: var(--color-main-background);
    border-radius: var(--default-border-radius);
    -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
    -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
    box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  }

  .content-header {
    border-bottom-color: var(--color-border);
    border-bottom-style: dashed;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center
  }

  .content-header-title {
    font-weight: bold;
    font-size: calc(var(--default-font-size) * 1.5);
  }

  .content {
    padding: 15px;
  }
</style>
