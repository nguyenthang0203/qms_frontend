import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, CloudUpload, Info, Lightbulb, ShieldCheck, HelpCircle, Brain, Clock3, BookOpen } from 'lucide-react';

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  'Bắt đầu',
  'Kỹ năng',
  'Tương tác',
  'Kiến thức',
  'Sáng tạo',
  'Kỷ luật',
  'Hợp tác',
  'Hoàn tất',
];

const CRITERIA_BY_STEP = [
  [
    {
      id: 'attitude',
      title: 'Tinh thần và thái độ trong học tập',
      description: 'Chủ động đặt câu hỏi, tham gia thảo luận và có tinh thần cầu thị.',
      icon: Brain,
    },
    {
      id: 'punctuality',
      title: 'Vào lớp học đúng giờ',
      description: 'Có mặt trước giờ học tối thiểu 5 phút để ổn định học tập.',
      icon: Clock3,
    },
    {
      id: 'preparation',
      title: 'Chuẩn bị bài tốt',
      description: 'Hoàn thành bài tập và đọc trước tài liệu trước khi vào buổi học.',
      icon: BookOpen,
    },
  ],
  [
    { id: 'skill_1', title: 'Khả năng ghi chép và tổng hợp', description: 'Ghi nhận nội dung chính và hệ thống hóa kiến thức sau giờ học.', icon: BookOpen },
    { id: 'skill_2', title: 'Tự học và tra cứu', description: 'Chủ động tìm tài liệu để mở rộng kiến thức liên quan.', icon: Brain },
    { id: 'skill_3', title: 'Áp dụng phương pháp học', description: 'Biết áp dụng phương pháp học phù hợp với từng nội dung.', icon: Lightbulb },
  ],
  [
    { id: 'interaction_1', title: 'Trao đổi với giảng viên', description: 'Tích cực đặt câu hỏi và phản hồi trong giờ học.', icon: Info },
    { id: 'interaction_2', title: 'Thảo luận nhóm', description: 'Tham gia thảo luận và đóng góp ý kiến xây dựng.', icon: HelpCircle },
    { id: 'interaction_3', title: 'Phản hồi học thuật', description: 'Phản biện có cơ sở và tôn trọng ý kiến khác biệt.', icon: ShieldCheck },
  ],
  [
    { id: 'knowledge_1', title: 'Nắm vững kiến thức nền tảng', description: 'Hiểu đúng các khái niệm cốt lõi của học phần.', icon: Brain },
    { id: 'knowledge_2', title: 'Liên hệ thực tiễn', description: 'Biết liên hệ kiến thức với bối cảnh thực tế.', icon: Lightbulb },
    { id: 'knowledge_3', title: 'Khả năng giải thích', description: 'Trình bày lại nội dung học một cách rõ ràng.', icon: Info },
  ],
  [
    { id: 'creative_1', title: 'Đề xuất ý tưởng mới', description: 'Đưa ra cách tiếp cận mới cho bài tập hoặc tình huống.', icon: Lightbulb },
    { id: 'creative_2', title: 'Cải tiến cách học', description: 'Tự điều chỉnh phương pháp học để đạt hiệu quả cao hơn.', icon: Brain },
    { id: 'creative_3', title: 'Giải quyết vấn đề linh hoạt', description: 'Xử lý vấn đề phát sinh bằng tư duy mở và sáng tạo.', icon: ShieldCheck },
  ],
  [
    { id: 'discipline_1', title: 'Tuân thủ nội quy lớp học', description: 'Thực hiện đúng quy định học tập và nề nếp lớp.', icon: ShieldCheck },
    { id: 'discipline_2', title: 'Hoàn thành đúng hạn', description: 'Nộp bài tập đúng thời gian được yêu cầu.', icon: Clock3 },
    { id: 'discipline_3', title: 'Duy trì tập trung học tập', description: 'Giữ sự tập trung và thái độ nghiêm túc trong tiết học.', icon: Brain },
  ],
  [
    { id: 'coop_1', title: 'Hợp tác với bạn học', description: 'Phối hợp với thành viên nhóm để hoàn thành nhiệm vụ chung.', icon: HelpCircle },
    { id: 'coop_2', title: 'Chia sẻ kiến thức', description: 'Sẵn sàng hỗ trợ bạn học thông qua chia sẻ kiến thức.', icon: Info },
    { id: 'coop_3', title: 'Tôn trọng tập thể', description: 'Lắng nghe và tôn trọng sự khác biệt của các thành viên.', icon: ShieldCheck },
  ],
];

const SCORE_OPTIONS = [
  'Chưa đánh giá',
  'Xuất sắc (5đ)',
  'Tốt (4đ)',
  'Khá (3đ)',
  'Trung bình (2đ)',
  'Yếu (1đ)',
];

const STORAGE_KEY = 'qms-self-assessment-state';

const getInitialState = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { formData: {}, savedAt: null, statusByStep: {}, submittedAt: null };
    }

    const parsed = JSON.parse(stored);
    if (parsed.formData) {
      return {
        formData: parsed.formData || {},
        savedAt: parsed.savedAt || null,
        statusByStep: parsed.statusByStep || {},
        submittedAt: parsed.submittedAt || null,
      };
    }

    // Backward compatibility with the previous shape.
    return { formData: parsed || {}, savedAt: null, statusByStep: {}, submittedAt: null };
  } catch {
    return { formData: {}, savedAt: null, statusByStep: {}, submittedAt: null };
  }
};

const getStepCriteria = (stepNumber) => CRITERIA_BY_STEP[stepNumber - 1] || [];

const getStepCompletionInfo = (stepNumber, formData) => {
  const criteria = getStepCriteria(stepNumber);
  const stepKey = `step_${stepNumber}`;
  const stepData = formData[stepKey] || { scores: {} };

  const completed = criteria.filter((criterion) => {
    const value = stepData.scores?.[criterion.id];
    return value && value !== 'Chưa đánh giá';
  }).length;

  return {
    completed,
    total: criteria.length,
    isDone: criteria.length > 0 && completed === criteria.length,
  };
};

const SelfAssessmentPage = () => {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const parsedStep = Number(stepParam || '1');
  const currentStep = Number.isNaN(parsedStep) ? 1 : Math.min(Math.max(parsedStep, 1), TOTAL_STEPS);
  const isSummaryStep = currentStep === TOTAL_STEPS;

  const [assessmentState, setAssessmentState] = useState(getInitialState);
  const { formData, savedAt, statusByStep, submittedAt } = assessmentState;

  const criteria = getStepCriteria(currentStep);

  const currentKey = `step_${currentStep}`;
  const currentStepData = formData[currentKey] || { scores: {}, note: '' };

  const completedCount = useMemo(
    () =>
      Object.values(currentStepData.scores).filter((value) => value && value !== 'Chưa đánh giá')
        .length,
    [currentStepData.scores],
  );
  const isCurrentStepCompleted = !isSummaryStep && completedCount === criteria.length;
  const allRequiredStepsCompleted = useMemo(
    () =>
      Array.from({ length: TOTAL_STEPS - 1 }, (_, idx) => getStepCompletionInfo(idx + 1, formData).isDone).every(Boolean),
    [formData],
  );

  const persistState = (nextState) => {
    setAssessmentState(nextState);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  };

  const buildStatusByStep = (nextFormData) => {
    const nextStatus = {};
    for (let step = 1; step <= TOTAL_STEPS - 1; step += 1) {
      const info = getStepCompletionInfo(step, nextFormData);
      nextStatus[`step_${step}`] = {
        completed: info.completed,
        total: info.total,
        isDone: info.isDone,
      };
    }
    const allStepsDone = Array.from({ length: TOTAL_STEPS - 1 }, (_, idx) => nextStatus[`step_${idx + 1}`]?.isDone).every(Boolean);
    nextStatus.step_8 = {
      completed: allStepsDone ? 1 : 0,
      total: 1,
      isDone: allStepsDone,
    };
    return nextStatus;
  };

  const updateScore = (criterionId, score) => {
    const nextFormData = {
      ...formData,
      [currentKey]: {
        ...currentStepData,
        scores: {
          ...currentStepData.scores,
          [criterionId]: score,
        },
      },
    };
    persistState({
      ...assessmentState,
      formData: nextFormData,
      statusByStep: buildStatusByStep(nextFormData),
      submittedAt: null,
    });
  };

  const updateNote = (note) => {
    const nextFormData = {
      ...formData,
      [currentKey]: {
        ...currentStepData,
        note,
      },
    };
    persistState({
      ...assessmentState,
      formData: nextFormData,
      statusByStep: buildStatusByStep(nextFormData),
      submittedAt: null,
    });
  };

  const saveDraft = () => {
    const nowIso = new Date().toISOString();
    persistState({
      ...assessmentState,
      savedAt: nowIso,
      statusByStep: buildStatusByStep(formData),
      submittedAt: null,
    });
  };

  const goNext = () => {
    if (isSummaryStep) {
      if (!allRequiredStepsCompleted) {
        return;
      }
      const nowIso = new Date().toISOString();
      persistState({
        ...assessmentState,
        savedAt: nowIso,
        statusByStep: buildStatusByStep(formData),
        submittedAt: nowIso,
      });
      return;
    }

    if (!isCurrentStepCompleted) {
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      navigate(`/assessment/${currentStep + 1}`);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      navigate(`/assessment/${currentStep - 1}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-900">Đánh giá Ý thức Tham gia Học tập</h2>
        <p className="text-sm text-primary-600 mt-1">
          Đánh giá ý thức tham gia học tập. Hoàn thành bước hiện tại trước khi chuyển bước tiếp theo.
        </p>
      </div>

      <div className="bg-white border border-primary-100 p-6 rounded-xl shadow-sm">
        <div className="relative flex justify-between items-center gap-2">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-primary-100" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary-600 transition-all"
            style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
          {STEP_TITLES.map((title, idx) => {
            const stepNumber = idx + 1;
            const isCurrent = stepNumber === currentStep;
            const isDone = stepNumber < currentStep;
            return (
              <div key={title} className="relative z-10 flex flex-col items-center gap-2 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    isDone
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : isCurrent
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'bg-white border-primary-200 text-primary-600'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wide text-center ${
                    isCurrent ? 'text-primary-700' : 'text-primary-600'
                  }`}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {!isSummaryStep ? (
            <>
              <div className="bg-white border border-primary-100 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex justify-between items-center">
                  <h3 className="font-semibold text-primary-700">
                    Tiêu chí đánh giá cấp độ {currentStep}
                  </h3>
                  <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Trọng số: 30%
                  </span>
                </div>
                <div className="divide-y divide-primary-100">
                  {criteria.map((criterion) => {
                    const Icon = criterion.icon;
                    return (
                      <div
                        key={criterion.id}
                        className="p-6 hover:bg-primary-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon size={18} className="text-primary-600" />
                            <h4 className="font-semibold text-primary-900 text-sm">{criterion.title}</h4>
                          </div>
                          <p className="text-sm text-primary-600">{criterion.description}</p>
                        </div>
                        <div className="min-w-[180px]">
                          <select
                            value={currentStepData.scores[criterion.id] || 'Chưa đánh giá'}
                            onChange={(event) => updateScore(criterion.id, event.target.value)}
                            className="w-full rounded-lg border-primary-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            {SCORE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-primary-100 rounded-xl shadow-sm p-6">
                <label htmlFor="self-note" className="block font-semibold text-sm text-primary-900 mb-2">
                  Ghi chú bổ sung (Tùy chọn)
                </label>
                <textarea
                  id="self-note"
                  rows={4}
                  value={currentStepData.note || ''}
                  onChange={(event) => updateNote(event.target.value)}
                  placeholder="Nhập ý kiến của bạn về quá trình học tập..."
                  className="w-full rounded-lg border-primary-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </>
          ) : (
            <div className="bg-white border border-primary-100 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
                <h3 className="font-semibold text-primary-700">Trang tổng kết trước khi gửi</h3>
                <p className="text-xs text-primary-600 mt-1">
                  Kiểm tra toàn bộ điểm tự đánh giá của 7 bước trước khi gửi.
                </p>
              </div>
              <div className="p-6 space-y-6">
                {Array.from({ length: TOTAL_STEPS - 1 }, (_, idx) => idx + 1).map((stepNumber) => {
                  const stepCriteria = getStepCriteria(stepNumber);
                  const stepKey = `step_${stepNumber}`;
                  const stepData = formData[stepKey] || { scores: {}, note: '' };
                  const completion = getStepCompletionInfo(stepNumber, formData);

                  return (
                    <div key={stepNumber} className="rounded-xl border border-primary-100 overflow-hidden">
                      <div className="px-4 py-3 bg-primary-50 border-b border-primary-100 flex items-center justify-between">
                        <h4 className="font-semibold text-primary-800 text-sm">
                          Bước {stepNumber}: {STEP_TITLES[stepNumber - 1]}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                            completion.isDone ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                          }`}
                        >
                          {completion.completed}/{completion.total}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        {stepCriteria.map((criterion) => (
                          <div key={criterion.id} className="flex justify-between gap-4 text-sm">
                            <span className="text-primary-800">{criterion.title}</span>
                            <span className="text-primary-600 font-medium">
                              {stepData.scores?.[criterion.id] || 'Chưa đánh giá'}
                            </span>
                          </div>
                        ))}
                        {stepData.note ? (
                          <div className="mt-3 pt-3 border-t border-primary-100">
                            <p className="text-xs text-primary-600">
                              <span className="font-semibold">Ghi chú:</span> {stepData.note}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
            <h4 className="font-semibold text-primary-800 text-sm mb-4">Tổng quan bước {currentStep}</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary-600">{isSummaryStep ? 'Bước hoàn thành' : 'Tiêu chí đã hoàn thành'}</span>
                <span className="font-bold text-primary-800">
                  {isSummaryStep ? `${Object.values(statusByStep).filter((item) => item?.isDone).length}/${TOTAL_STEPS}` : `${completedCount}/${criteria.length}`}
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all"
                  style={{
                    width: isSummaryStep
                      ? `${(Object.values(statusByStep).filter((item) => item?.isDone).length / TOTAL_STEPS) * 100}%`
                      : `${(completedCount / criteria.length) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-start gap-2 pt-4 border-t border-primary-200">
                <Info size={16} className="text-secondary-600 mt-0.5" />
                <p className="text-xs text-primary-700">
                  {isSummaryStep
                    ? 'Khi đủ tất cả bước, bạn có thể gửi tự đánh giá ở nút chính bên dưới.'
                    : 'Chọn đầy đủ đánh giá để mở khóa nút Tiếp tục.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-primary-100 rounded-xl p-6 shadow-sm border-dashed">
            <h4 className="font-semibold text-primary-900 text-sm mb-3">Minh chứng đi kèm</h4>
            <div className="border-2 border-dashed border-primary-100 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-primary-50 transition-colors cursor-pointer">
              <CloudUpload size={28} className="text-primary-500 mb-2" />
              <p className="text-xs text-primary-700 font-medium">Kéo thả file hoặc nhấn để tải lên</p>
              <p className="text-[10px] text-primary-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <div className="bg-white border border-primary-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-primary-800 mb-2">Trạng thái bản nháp</p>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: TOTAL_STEPS }, (_, idx) => idx + 1).map((stepNumber) => {
                const key = `step_${stepNumber}`;
                const done = statusByStep[key]?.isDone;
                return (
                  <div
                    key={stepNumber}
                    className={`text-center text-[10px] px-2 py-1 rounded border ${
                      done ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-primary-50 text-primary-600 border-primary-100'
                    }`}
                  >
                    B{stepNumber}
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-primary-600 mt-3">
              {savedAt ? `Lưu gần nhất: ${new Date(savedAt).toLocaleString()}` : 'Chưa có bản nháp nào được lưu.'}
            </p>
            {submittedAt ? (
              <p className="text-[11px] text-primary-700 mt-1 font-semibold">
                Đã gửi lúc: {new Date(submittedAt).toLocaleString()}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={goNext}
              disabled={isSummaryStep ? !allRequiredStepsCompleted : !isCurrentStepCompleted}
              className="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
            >
              {isSummaryStep ? 'Gửi tự đánh giá' : 'Tiếp tục'}
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="w-full bg-white text-primary-800 border border-primary-200 font-medium py-3 rounded-xl hover:bg-primary-50 transition-all"
            >
              Lưu bản nháp
            </button>
            <button
              type="button"
              onClick={goPrev}
              disabled={currentStep === 1}
              className="w-full bg-white text-primary-700 border border-primary-200 font-medium py-3 rounded-xl hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Quay lại bước trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
