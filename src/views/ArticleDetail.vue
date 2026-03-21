<template>

    <div class="articleDetail-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" style="width: 60px; height: 60px;"></el-image>
                <h1>文章详情</h1>
            </div>
        </div>
        <div class="content">
            <div class="diary-card">
                <p class="article-title">文章信息</p>
                <div class="sub-title">
                    <el-tag size="large" class="category-tag">{{ articleDetail.categoryName }}</el-tag>
                    <div class="flex-box">
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>{{ dayjs(articleDetail.updateAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </div>
                </div>
                <h1 class="article-title">{{ articleDetail.title }}</h1>
                <div class="summary-content" v-if="articleDetail.summary">
                    <p>{{ articleDetail.summary }}</p>
                </div>
                <div style="margin-top: 20px;" class="flex-box">
                    <div class="item flex-box">
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>{{ articleDetail.authorName }}</span>
                    </div>
                    <div class="flex-box">
                        <el-icon>
                            <Platform />
                        </el-icon>
                        <span>阅读数量： {{ articleDetail.readCount }}</span>
                    </div>
                </div>
            </div>
            <div class="diary-card">
                <div class="title">正文内容</div>
                <div class="content-wrapper" v-html="formatContent(articleDetail.content)"></div>
                <div class="tags-content" v-if="articleDetail.tagArray && articleDetail.tagArray.length > 0">
                    <h4 class="tags-title">相关标签</h4>
                    <div class="tags-list">
                        <el-tag type="info" effect="light" v-for="tag in articleDetail.tagArray" :key="tag"
                            class="tag-item">{{ tag
                            }}</el-tag>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { getKnowledgeDetail } from '@/api/frontend'
import { Avatar, Histogram, List, Platform } from '@element-plus/icons-vue'
import { format } from 'echarts';
import { dayjs } from 'element-plus';
import { onMounted, ref } from 'vue';


const iconUrl = new URL('@/assets/images/book.png', import.meta.url).href

const props = defineProps({
    id: String
})

const articleDetail = ref({})

const formatContent = (content) => {
    if (!content) return ''

    // 基本的HTML清理和格式化
    let formatted = content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')

    return formatted
}

onMounted(() => {
    getKnowledgeDetail(props.id).then(res => {
        articleDetail.value = res
    })
})

</script>

<style scoped lang="scss">
.articleDetail-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);

    .flex-box {
        display: flex;
        align-items: center;

        .item {
            margin-right: 20px;

            span {
                margin-left: 5px;
            }
        }
    }

    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;

        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }

    .content {
        margin: 0 auto;
        width: 980px;
        padding: 20px;

        .diary-card {
            margin-bottom: 20px;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

            .title {
                margin-bottom: 15px;
                font-size: 20px;
                font-weight: 600;
                color: #374151;
            }

            .sub-title {
                margin-top: 20px;
                display: flex;
                align-items: center;

                .category-tag {
                    margin-right: 20px;
                }
            }

            .article-title {
                font-size: 28px;
                font-weight: bold;
                color: #111827;
                margin-top: 30px;
                margin-bottom: 10px;
            }

            .summary-content {
                background: rgba(126, 211, 33, 0.1);
                border-left: 4px solid #7ED321;
                padding: 10px 15px;
                border-radius: 0 8px 8px 0;
                position: relative;
            }

            .content-wrapper {
                font-size: 15px;
                color: #374151;
                line-height: 1.8;
                overflow-x: auto;
                word-break: break-word;

                :deep(p) {
                    margin-bottom: 16px;
                    line-height: 1.8;
                }

                :deep(strong) {
                    font-weight: 600;
                    color: #111827;
                }

                :deep(em) {
                    font-style: italic;
                    color: #6b7280;
                }

                :deep(br) {
                    display: block;
                    content: '';
                    margin-bottom: 8px;
                }

                :deep(h1),
                :deep(h2),
                :deep(h3),
                :deep(h4),
                :deep(h5),
                :deep(h6) {
                    margin: 20px 0 12px;
                    color: #111827;
                    font-weight: 600;
                    line-height: 1.4;
                }

                :deep(h1) {
                    font-size: 24px;
                }

                :deep(h2) {
                    font-size: 20px;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 8px;
                }

                :deep(h3) {
                    font-size: 17px;
                }

                :deep(ul),
                :deep(ol) {
                    padding-left: 25px;
                    margin-bottom: 16px;
                }

                :deep(li) {
                    margin-bottom: 8px;
                    line-height: 1.6;
                }

                :deep(img) {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 10px 0;
                }

                :deep(blockquote) {
                    border-left: 4px solid #8b5cf6;
                    padding-left: 16px;
                    margin: 16px 0;
                    color: #6b7280;
                    background: #f9fafb;
                    padding: 12px 16px;
                    border-radius: 0 8px 8px 0;
                }

                :deep(code) {
                    background: #f3f4f6;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                }

                :deep(pre) {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 16px;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 16px 0;

                    code {
                        background: transparent;
                        color: inherit;
                        padding: 0;
                    }
                }
            }

            .tags-content {
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid #e5e7eb;

                .tags-title {
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                }

                .tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
            }
        }
    }
}
</style>
