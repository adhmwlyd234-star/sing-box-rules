/*
 * Dynamic Mocking Script for CrashSight / Tencent Telemetry
 * وظيفته: إيهام محرك الحماية برفع التقارير بنجاح عبر استجابة هيكلية مطابقة
 */

const url = $request.url;

// بناء استجابة JSON وهمية مطابقة لما تتوقعه محركات تقارير الألعاب الشهيرة
const mockBody = {
    status: "success",
    code: 200,
    msg: "report uploaded successfully",
    result: 0,
    data: {
        report_id: Math.floor(100000 + Math.random() * 900000).toString(),
        timestamp: Date.now()
    }
};

// إنشاء استجابة HTTP كاملة ومحقونة محلياً لقطع الطريق على السيرفر الخارجي
const response = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(mockBody)
};

// تنفيذ الاستجابة الفورية وتخطي إرسال الباكيت الحقيقي للسيرفر
$done(response);
