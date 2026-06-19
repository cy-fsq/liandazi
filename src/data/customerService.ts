import { TypingMaterial } from '@/types';

export const customerServiceMaterials: TypingMaterial[] = [
  {
    id: 'cs-1',
    categoryId: 'customer-service',
    title: '售前：欢迎与咨询',
    content: '顾客：你好，在吗？\n客服：您好！欢迎光临，请问有什么可以帮到您的吗？\n顾客：我想咨询一下你们的产品\n客服：好的，请问您想了解哪方面的产品呢？我可以为您详细介绍。',
    source: '售前咨询标准话术',
    difficulty: 'easy',
    wordCount: 62,
    language: 'zh',
    tags: ['客服', '售前', '咨询', '欢迎']
  },
  {
    id: 'cs-2',
    categoryId: 'customer-service',
    title: '售前：产品介绍',
    content: '顾客：这款产品有什么特点？\n客服：这款产品采用优质材料制作，做工精细，设计时尚。\n客服：它具有多种功能，操作简单方便，很多顾客反馈使用体验非常好。\n客服：您感兴趣的话可以多了解一下，有任何问题随时问我。',
    source: '产品介绍标准话术',
    difficulty: 'easy',
    wordCount: 82,
    language: 'zh',
    tags: ['客服', '售前', '产品', '介绍']
  },
  {
    id: 'cs-3',
    categoryId: 'customer-service',
    title: '售前：价格优惠与促销',
    content: '顾客：价格能再便宜一点吗？\n客服：非常理解您的想法，我们现在已经是活动价了，原价要更高呢。\n客服：而且现在下单还可以享受满减优惠，非常划算的。\n客服：机会难得，建议您尽快下单，活动结束就恢复原价了哦。',
    source: '价格谈判话术',
    difficulty: 'medium',
    wordCount: 84,
    language: 'zh',
    tags: ['客服', '售前', '价格', '优惠', '促销']
  },
  {
    id: 'cs-4',
    categoryId: 'customer-service',
    title: '售前：库存与发货查询',
    content: '顾客：这款产品有现货吗？\n客服：您看的这款目前是有现货的，当天就能发货。\n顾客：发什么快递？多久能到？\n客服：我们默认发顺丰或京东快递，一般2-4天可以送达，偏远地区需要5-7天。',
    source: '发货咨询话术',
    difficulty: 'easy',
    wordCount: 60,
    language: 'zh',
    tags: ['客服', '售前', '库存', '发货', '快递']
  },
  {
    id: 'cs-5',
    categoryId: 'customer-service',
    title: '售中：订单确认',
    content: '客服：您好，感谢您的订购！\n客服：您的订单已成功提交，我们会尽快为您安排发货。\n客服：预计3-5天内可以送达，如有任何问题，请随时联系我们。\n顾客：好的，谢谢！\n客服：不客气，祝您购物愉快！',
    source: '订单确认标准话术',
    difficulty: 'easy',
    wordCount: 72,
    language: 'zh',
    tags: ['客服', '售中', '订单', '确认']
  },
  {
    id: 'cs-6',
    categoryId: 'customer-service',
    title: '售中：发货通知',
    content: '客服：您好，您的订单已发货，快递单号是：SF1234567890。\n客服：您可以随时在订单详情中查看物流信息。\n客服：预计2-3天可以送达，请您注意查收。\n顾客：好的，收到，谢谢！\n客服：不用客气，有问题随时联系我们。',
    source: '发货通知话术',
    difficulty: 'easy',
    wordCount: 78,
    language: 'zh',
    tags: ['客服', '售中', '发货', '物流']
  },
  {
    id: 'cs-7',
    categoryId: 'customer-service',
    title: '售中：物流查询',
    content: '顾客：我的快递到哪里了？\n客服：您好，我帮您查询一下。\n客服：根据物流信息显示，您的包裹已到达您所在城市，预计今天或明天送达。\n客服：如果超过预计时间没有收到，您可以随时联系我，我会帮您跟进处理。',
    source: '物流查询标准话术',
    difficulty: 'easy',
    wordCount: 74,
    language: 'zh',
    tags: ['客服', '售中', '物流', '查询']
  },
  {
    id: 'cs-8',
    categoryId: 'customer-service',
    title: '售后：退换货处理',
    content: '顾客：我想申请退货\n客服：您好，可以的。请问是什么原因想退货呢？\n顾客：尺码不合适\n客服：好的，了解了。我们支持7天无理由退换，请您将商品保持原包装完好。\n客服：请提供一下您的订单号，我马上为您处理退换货申请。',
    source: '退换货处理话术',
    difficulty: 'medium',
    wordCount: 80,
    language: 'zh',
    tags: ['客服', '售后', '退换货', '退货']
  },
  {
    id: 'cs-9',
    categoryId: 'customer-service',
    title: '售后：质量问题处理',
    content: '顾客：收到货发现有质量问题\n客服：非常抱歉给您带来不便！请问具体是什么问题？可以发张照片给我们看看吗？\n顾客：好的，这里有破损\n客服：非常抱歉！我们会为您安排退换货，并承担运费。\n客服：给您添麻烦了，我们会改进产品质量，感谢您的反馈！',
    source: '质量问题处理话术',
    difficulty: 'medium',
    wordCount: 76,
    language: 'zh',
    tags: ['客服', '售后', '质量', '问题']
  },
  {
    id: 'cs-10',
    categoryId: 'customer-service',
    title: '售后：投诉处理',
    content: '顾客：你们的服务太差了！\n客服：非常抱歉给您带来不好的体验，我们非常重视您的反馈。\n客服：请问您具体遇到了什么问题？我们会立即核实情况。\n客服：我会给您一个满意的答复，24小时内联系您解决。\n顾客：好的，那就等你们回复\n客服：非常感谢您的耐心，我们一定妥善处理。',
    source: '投诉处理标准话术',
    difficulty: 'medium',
    wordCount: 86,
    language: 'zh',
    tags: ['客服', '售后', '投诉', '处理']
  },
  {
    id: 'cs-11',
    categoryId: 'customer-service',
    title: '售后：好评与复购引导',
    content: '客服：您好，您收到的商品还满意吗？\n顾客：挺满意的，质量不错\n客服：很高兴您满意！\n客服：如果您觉得不错的话，可以给我们一个好评，这对我们很重要。\n客服：我们店铺后续会有新的活动，您可以关注一下，有需要随时联系我们哦！',
    source: '好评引导话术',
    difficulty: 'easy',
    wordCount: 72,
    language: 'zh',
    tags: ['客服', '售后', '好评', '复购', '引导']
  },
  {
    id: 'cs-12',
    categoryId: 'customer-service',
    title: '售前：尺寸和规格咨询',
    content: '顾客：请问这个尺寸是多少？\n客服：好的，我来为您介绍具体规格。\n客服：这款产品的尺寸是长30厘米，宽20厘米，高15厘米。\n客服：您也可以参考商品详情页的尺寸图，上面有很详细的标注。\n顾客：好的，明白了\n客服：如果还有其他问题，随时问我哦！',
    source: '规格咨询话术',
    difficulty: 'easy',
    wordCount: 78,
    language: 'zh',
    tags: ['客服', '售前', '尺寸', '规格']
  }
];