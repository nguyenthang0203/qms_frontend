import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const standards = [
  { code: 'TC01', failedCriteria: 1, mandatoryFailed: false },
  { code: 'TC02', failedCriteria: 2, mandatoryFailed: false },
  { code: 'TC03', failedCriteria: 0, mandatoryFailed: true },
];

const isStandardPassed = (item) => item.failedCriteria <= 2 && !item.mandatoryFailed;

const DecisionRulesPage = () => {
  const passedCount = standards.filter(isStandardPassed).length;
  const hasMandatoryFail = standards.some((item) => item.mandatoryFailed);
  const programPassed = passedCount === standards.length && !hasMandatoryFail;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-900">Decision Rule Engine</h2>
        <p className="text-sm text-primary-600 mt-1">
          Mô phỏng quy tắc TT04: chuẩn đạt khi không quá 2 tiêu chí không đạt và không vi phạm tiêu chí điều kiện.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Tiêu chuẩn đạt</p>
          <p className="text-3xl font-bold text-primary-700 mt-2">{passedCount}/{standards.length}</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Mandatory fail</p>
          <p className="text-3xl font-bold text-secondary-700 mt-2">{hasMandatoryFail ? 'Có' : 'Không'}</p>
        </div>
        <div className="card-qms p-6">
          <p className="text-xs font-bold uppercase text-primary-600">Kết luận CTĐT</p>
          <p className={`text-3xl font-bold mt-2 ${programPassed ? 'text-primary-700' : 'text-secondary-700'}`}>
            {programPassed ? 'Đạt' : 'Không đạt'}
          </p>
        </div>
      </div>

      <div className="card-qms overflow-hidden">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <h3 className="text-sm font-bold text-primary-800 uppercase tracking-wider">Rule logs theo tiêu chuẩn</h3>
        </div>
        <div className="divide-y divide-primary-100">
          {standards.map((item) => {
            const passed = isStandardPassed(item);
            return (
              <div key={item.code} className="p-6 flex justify-between items-center gap-4">
                <div>
                  <p className="font-semibold text-primary-900">{item.code}</p>
                  <p className="text-sm text-primary-600 mt-1">
                    Tiêu chí không đạt: {item.failedCriteria} | Mandatory fail: {item.mandatoryFailed ? 'Có' : 'Không'}
                  </p>
                </div>
                <div className={`flex items-center text-xs font-bold ${passed ? 'text-primary-700' : 'text-secondary-700'}`}>
                  {passed ? <CheckCircle2 size={16} className="mr-1" /> : <AlertCircle size={16} className="mr-1" />}
                  {passed ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-secondary-200 bg-secondary-50/40 p-5">
        <p className="text-sm font-semibold text-secondary-800 flex items-center">
          <ShieldAlert size={16} className="mr-2" />
          Hard rule: nếu có bất kỳ tiêu chí điều kiện không đạt thì hệ thống chặn kết luận “Đạt”.
        </p>
      </div>
    </div>
  );
};

export default DecisionRulesPage;
