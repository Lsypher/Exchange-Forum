<template>
  <div class="create-article-container">
    <div class="container">
      <div class="page-header">
        <router-link to="/articles" class="back-link">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回文章列表</span>
        </router-link>
        <h1 class="page-title">创作文章</h1>
        <p class="page-description">分享您的金融见解和市场分析</p>
      </div>

      <div class="editor-card">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="article-form">
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="输入引人注目的标题..."
              size="large"
              class="title-input"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>

          <div class="form-row">
            <el-form-item label="分类" prop="category" class="form-col">
              <el-select v-model="form.category" placeholder="选择分类" size="large" class="category-select">
                <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
              </el-select>
            </el-form-item>

            <el-form-item label="标签" class="form-col">
              <el-input
                v-model="form.tags"
                placeholder="用逗号分隔多个标签"
                size="large"
                class="tags-input"
              />
            </el-form-item>
          </div>

          <el-form-item label="文章摘要" prop="preview">
            <el-input
              v-model="form.preview"
              type="textarea"
              :rows="3"
              placeholder="简要描述文章内容..."
              maxlength="200"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="文章内容" prop="content">
            <div class="editor-wrapper">
              <div class="editor-toolbar">
                <button type="button" @click="insertFormat('**', '**')" class="toolbar-btn" title="加粗">
                  <strong>B</strong>
                </button>
                <button type="button" @click="insertFormat('*', '*')" class="toolbar-btn" title="斜体">
                  <em>I</em>
                </button>
                <button type="button" @click="insertFormat('\n## ', '')" class="toolbar-btn" title="标题">
                  H
                </button>
                <button type="button" @click="insertFormat('[', '](url)')" class="toolbar-btn" title="链接">
                  <el-icon><Link /></el-icon>
                </button>
                <button type="button" @click="insertFormat('\n> ', '')" class="toolbar-btn" title="引用">
                  <el-icon><ChatLineSquare /></el-icon>
                </button>
                <button type="button" @click="insertFormat('\n- ', '')" class="toolbar-btn" title="列表">
                  <el-icon><List /></el-icon>
                </button>
                <button type="button" @click="insertFormat('\n```\n', '\n```')" class="toolbar-btn" title="代码">
                  <el-icon><Monitor /></el-icon>
                </button>
              </div>
              <el-input
                ref="contentRef"
                v-model="form.content"
                type="textarea"
                :rows="15"
                placeholder="在这里撰写您的文章内容...
支持 Markdown 语法格式"
                class="content-editor"
              />
            </div>
            <div class="editor-hint">
              <el-icon><InfoFilled /></el-icon>
              <span>支持 Markdown 语法，使用工具栏或手动输入格式符号</span>
            </div>
          </el-form-item>

          <div class="form-actions">
            <el-button @click="saveDraft" :loading="savingDraft" size="large" class="draft-btn">
              保存草稿
            </el-button>
            <el-button
              type="primary"
              @click="publishArticle"
              :loading="publishing"
              size="large"
              class="publish-btn"
              :disabled="!form.title || !form.content"
            >
              <el-icon v-if="!publishing"><Upload /></el-icon>
              <span>{{ publishing ? '发布中...' : '发布文章' }}</span>
            </el-button>
          </div>
        </el-form>
      </div>

      <div class="tips-card">
        <h3 class="tips-title">写作建议</h3>
        <ul class="tips-list">
          <li>选择一个清晰、具体的标题，让读者一目了然</li>
          <li>在摘要中简要概括文章核心观点</li>
          <li>使用合理的段落结构和标题层级</li>
          <li>适当添加数据和引用来支撑观点</li>
          <li>添加相关标签有助于文章被更多人发现</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Link, List, Monitor, InfoFilled, Upload, ChatLineSquare } from '@element-plus/icons-vue';
import axios from '../axios';

const router = useRouter();
const formRef = ref();
const contentRef = ref();
const savingDraft = ref(false);
const publishing = ref(false);

const categories = ['市场分析', '投资策略', '货币动态', '宏观经济', '区块链', '保险理财', '房产投资', '其他'];

const form = reactive({
  title: '',
  preview: '',
  content: '',
  category: '',
  tags: '',
});

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 5, max: 100, message: '标题长度在 5 到 100 个字符', trigger: 'blur' },
  ],
  preview: [
    { required: true, message: '请输入文章摘要', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
    { min: 20, message: '内容至少需要 20 个字符', trigger: 'blur' },
  ],
};

const insertFormat = (before: string, after: string) => {
  const textarea = contentRef.value?.$refs.textarea;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = form.content.substring(start, end);

  const newText = form.content.substring(0, start) + before + selectedText + after + form.content.substring(end);
  form.content = newText;

  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
  }, 0);
};

const saveDraft = async () => {
  try {
    savingDraft.value = true;
    localStorage.setItem('article_draft', JSON.stringify(form));
    ElMessage.success('草稿已保存');
  } catch (error) {
    ElMessage.error('保存失败');
  } finally {
    savingDraft.value = false;
  }
};

const loadDraft = () => {
  const draft = localStorage.getItem('article_draft');
  if (draft) {
    try {
      const parsed = JSON.parse(draft);
      Object.assign(form, parsed);
    } catch (e) {
      // ignore
    }
  }
};

const publishArticle = async () => {
  try {
    await formRef.value.validate();
  } catch {
    ElMessage.warning('请完善文章信息');
    return;
  }

  try {
    publishing.value = true;
    await axios.post('/articles', {
      title: form.title,
      preview: form.preview,
      content: form.content,
      category: form.category,
      tags: form.tags,
    });
    ElMessage.success('文章发布成功！');
    localStorage.removeItem('article_draft');
    router.push({ name: 'News' });
  } catch (error: any) {
    ElMessage.error(error.response?.data?.message || '发布失败，请重试');
  } finally {
    publishing.value = false;
  }
};

loadDraft();
</script>

<style scoped>
.create-article-container {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  padding: 40px 0 80px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  margin-bottom: 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8b7355;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.back-link:hover {
  color: #6b5744;
  transform: translateX(-4px);
}

.page-title {
  margin: 0 0 8px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 42px;
  font-weight: 700;
  color: #2d2a26;
  letter-spacing: -0.5px;
}

.page-description {
  margin: 0;
  font-size: 18px;
  color: #8b7355;
}

.editor-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.08);
  padding: 40px;
  margin-bottom: 32px;
}

.article-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: #2d2a26;
  font-size: 15px;
  margin-bottom: 8px;
}

.title-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  padding: 4px 16px;
  box-shadow: none;
  border: 2px solid #e8e4de;
  transition: all 0.2s ease;
}

.title-input :deep(.el-input__wrapper:hover),
.title-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.title-input :deep(.el-input__inner) {
  font-size: 18px;
  font-weight: 600;
  color: #2d2a26;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.category-select,
.tags-input {
  width: 100%;
}

.category-select :deep(.el-input__wrapper),
.tags-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: none;
  border: 2px solid #e8e4de;
}

.category-select :deep(.el-input__wrapper:hover),
.tags-input :deep(.el-input__wrapper:hover),
.category-select :deep(.el-input__wrapper.is-focus),
.tags-input :deep(.el-input__wrapper.is-focus) {
  border-color: #c4a77d;
}

.editor-wrapper {
  border: 2px solid #e8e4de;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.editor-wrapper:focus-within {
  border-color: #c4a77d;
}

.editor-toolbar {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: #faf8f5;
  border-bottom: 1px solid #e8e4de;
}

.toolbar-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #6b5744;
  font-size: 14px;
  transition: all 0.15s ease;
}

.toolbar-btn:hover {
  background: #e8e4de;
  color: #2d2a26;
}

.content-editor :deep(.el-textarea__inner) {
  border: none;
  border-radius: 0;
  font-family: 'Source Sans Pro', 'Noto Sans SC', sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #2d2a26;
  resize: none;
}

.content-editor :deep(.el-textarea__inner:focus) {
  box-shadow: none;
}

.editor-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 13px;
  color: #a69580;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8e4de;
}

.draft-btn {
  height: 48px;
  padding: 0 32px;
  border-radius: 10px;
  font-weight: 600;
  background: #f5f2ed;
  border: 2px solid #e8e4de;
  color: #6b5744;
  transition: all 0.2s ease;
}

.draft-btn:hover {
  background: #e8e4de;
  color: #2d2a26;
}

.publish-btn {
  height: 48px;
  padding: 0 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #c4a77d 0%, #a68b5b 100%);
  border: none;
  color: #fff;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.publish-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(166, 139, 91, 0.4);
}

.publish-btn:disabled {
  background: #d4cfc4;
  cursor: not-allowed;
}

.tips-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(45, 42, 38, 0.08);
  padding: 32px;
}

.tips-title {
  margin: 0 0 16px;
  font-family: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  color: #2d2a26;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  margin-bottom: 10px;
  color: #6b5744;
  line-height: 1.6;
}

.tips-list li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .editor-card {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .draft-btn,
  .publish-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
