<template>
  <div class="new-url-form-wrapper">
    <div class="new-url-header">
      <span>Short new URL</span>
    </div>
    <div>
      <n-form
        ref="newShortUrlForm"
        class="new-url-form"
        :model="newShortUrl"
        :rules="rules"
      >
        <n-form-item label="Name" path="name" class="new-url-item">
          <n-input v-model:value="newShortUrl.name" placeholder="Name of URL" />
        </n-form-item>
        <n-form-item label="Alias" path="slug" class="new-url-item">
          <n-input
            v-model:value="newShortUrl.slug"
            placeholder="Your custom alias"
          />
        </n-form-item>
        <n-form-item label="Long link" path="long_url" class="new-url-item">
          <n-input
            v-model:value="newShortUrl.long_url"
            placeholder="Long link here"
            class="new-url-item"
          />
        </n-form-item>
        <n-form-item>
          <n-button @click="handleValidateClick"> Validate </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
  <div style="width: 100%"></div>
</template>

<script setup>
import { NForm, NInput, NFormItem, NButton } from 'naive-ui';
import { ref } from 'vue';

const newShortUrlForm = ref(null);

const newShortUrl = ref({
  name: '',
  slug: '',
  long_url: '',
});

const rules = {
  user: {
    name: {
      required: true,
      message: 'Please input your name',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: 'Please input your age',
      trigger: ['input', 'blur'],
    },
  },
  phone: {
    required: true,
    message: 'Please input your number',
    trigger: ['input'],
  },
};

const handleValidateClick = (e) => {
  e.preventDefault();
  newShortUrlForm.value?.validate((errors) => {
    if (!errors) {
      console.log('work');
    } else {
      console.log(errors);
    }
  });
};
</script>

<style lang="scss">
.new-url-form-wrapper {
  width: 100%;
  margin-bottom: 2em;
  border: 2px dashed #292929;
  border-radius: 15px;
  padding: 1em;

  .new-url-header {
    font-weight: bold;
    margin-bottom: 1em;
    font-size: 1.2em;
  }
}

.new-url-form {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;

  @media (width <= 800px) {
    flex-direction: column;
  }
}
.new-url-item {
  width: 15em;
}
</style>
