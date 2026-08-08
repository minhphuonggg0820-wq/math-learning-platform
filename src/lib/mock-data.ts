// ============================================================
// MathVerse - Comprehensive Mock Data
// ============================================================

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessonsCount: number;
  completedLessons: number;
  lessons: Lesson[];
  tags?: string[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  completed: boolean;
  formulas: Formula[];
  sandboxConfig?: SandboxConfig;
}

export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
  example?: string;
}

export interface SandboxConfig {
  type: "parabola" | "circle" | "trigonometry" | "linear" | "sine-wave";
  title: string;
  description: string;
  parameters: SandboxParameter[];
  formulaLatex: string;
}

export interface SandboxParameter {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  type: "multiple-choice" | "fill-blank" | "drag-drop" | "step-solve";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  questionLatex?: string;
  options?: string[];
  optionsLatex?: string[];
  correctAnswer: string | number | string[];
  hints: string[];
  explanation: string;
  explanationLatex?: string;
  xpReward: number;
  steps?: SolveStep[];
  dragItems?: DragItem[];
  dropZones?: DropZone[];
  blankAnswer?: string;
}

export interface SolveStep {
  instruction: string;
  latex?: string;
  answer: string;
  hint: string;
}

export interface DragItem {
  id: string;
  content: string;
  latex?: string;
}

export interface DropZone {
  id: string;
  label: string;
  correctItemId: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: "learning" | "quiz" | "streak" | "game" | "special";
  xpReward: number;
}

export interface FlashcardQuestion {
  formula: string;
  formulaName: string;
  options: string[];
  correctIndex: number;
}

export interface BalanceChallenge {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  equation: string;
  leftSide: string;
  rightSide: string;
  missingValue: number;
  description: string;
}

// ============================================================
// TOPICS & LESSONS
// ============================================================

export const topics: Topic[] = [
  {
    id: "algebra",
    title: "Đại số",
    description: "Phương trình, bất phương trình, hàm số và đa thức",
    icon: "Variable",
    color: "primary",
    lessonsCount: 3,
    completedLessons: 1,
    lessons: [
      {
        id: "algebra-quadratic",
        topicId: "algebra",
        title: "Phương trình bậc hai",
        description: "Tìm hiểu về phương trình bậc hai ax² + bx + c = 0 và công thức nghiệm",
        duration: "15 phút",
        difficulty: "medium",
        xpReward: 50,
        completed: true,
        formulas: [
          {
            id: "f1",
            name: "Công thức nghiệm phương trình bậc hai",
            latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
            description: "Cho phương trình ax² + bx + c = 0, nghiệm được tính bằng công thức trên",
            example: "x^2 - 5x + 6 = 0 \\Rightarrow x = \\frac{5 \\pm \\sqrt{25 - 24}}{2} = \\frac{5 \\pm 1}{2}"
          },
          {
            id: "f2",
            name: "Biệt thức (Discriminant)",
            latex: "\\Delta = b^2 - 4ac",
            description: "Biệt thức xác định số nghiệm: Δ > 0 → 2 nghiệm, Δ = 0 → 1 nghiệm kép, Δ < 0 → vô nghiệm"
          },
          {
            id: "f3",
            name: "Định lý Vieta",
            latex: "\\begin{cases} x_1 + x_2 = -\\frac{b}{a} \\\\ x_1 \\cdot x_2 = \\frac{c}{a} \\end{cases}",
            description: "Mối quan hệ giữa các nghiệm và hệ số của phương trình bậc hai"
          }
        ],
        sandboxConfig: {
          type: "parabola",
          title: "Khám phá đồ thị Parabol",
          description: "Thay đổi các hệ số a, b, c để quan sát đồ thị y = ax² + bx + c thay đổi theo thời gian thực",
          formulaLatex: "y = ax^2 + bx + c",
          parameters: [
            { name: "a", label: "Hệ số a", min: -5, max: 5, step: 0.5, defaultValue: 1 },
            { name: "b", label: "Hệ số b", min: -10, max: 10, step: 0.5, defaultValue: -2 },
            { name: "c", label: "Hệ số c", min: -10, max: 10, step: 0.5, defaultValue: -3 }
          ]
        }
      },
      {
        id: "algebra-linear",
        topicId: "algebra",
        title: "Hệ phương trình tuyến tính",
        description: "Giải hệ phương trình bậc nhất hai ẩn bằng phương pháp thế và cộng",
        duration: "12 phút",
        difficulty: "easy",
        xpReward: 35,
        completed: false,
        formulas: [
          {
            id: "f4",
            name: "Hệ phương trình tuyến tính 2 ẩn",
            latex: "\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}",
            description: "Hệ phương trình bậc nhất hai ẩn x và y"
          },
          {
            id: "f5",
            name: "Công thức Cramer",
            latex: "x = \\frac{\\begin{vmatrix} c_1 & b_1 \\\\ c_2 & b_2 \\end{vmatrix}}{\\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix}}, \\quad y = \\frac{\\begin{vmatrix} a_1 & c_1 \\\\ a_2 & c_2 \\end{vmatrix}}{\\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix}}",
            description: "Giải hệ phương trình bằng định thức"
          }
        ],
        sandboxConfig: {
          type: "linear",
          title: "Giao điểm 2 đường thẳng",
          description: "Thay đổi các hệ số để thấy hai đường thẳng cắt nhau, song song hay trùng nhau",
          formulaLatex: "y_1 = a_1x + b_1, \\quad y_2 = a_2x + b_2",
          parameters: [
            { name: "a1", label: "Hệ số a₁", min: -5, max: 5, step: 0.5, defaultValue: 2 },
            { name: "b1", label: "Hệ số b₁", min: -10, max: 10, step: 0.5, defaultValue: 1 },
            { name: "a2", label: "Hệ số a₂", min: -5, max: 5, step: 0.5, defaultValue: -1 },
            { name: "b2", label: "Hệ số b₂", min: -10, max: 10, step: 0.5, defaultValue: 3 }
          ]
        }
      },
      {
        id: "algebra-inequalities",
        topicId: "algebra",
        title: "Bất phương trình",
        description: "Bất phương trình bậc nhất, bậc hai và ứng dụng",
        duration: "18 phút",
        difficulty: "hard",
        xpReward: 65,
        completed: false,
        formulas: [
          {
            id: "f6",
            name: "Bất phương trình bậc hai",
            latex: "ax^2 + bx + c > 0 \\quad (a \\neq 0)",
            description: "Giải bất phương trình bậc hai dựa vào dấu của tam thức bậc hai"
          },
          {
            id: "f7",
            name: "Bất đẳng thức Cauchy-Schwarz",
            latex: "(a^2 + b^2)(c^2 + d^2) \\geq (ac + bd)^2",
            description: "Bất đẳng thức Cauchy-Schwarz (Bunhiacopxki)"
          }
        ]
      }
    ]
  },
  {
    id: "geometry",
    title: "Hình học",
    description: "Hình phẳng, hình không gian, véc tơ và tọa độ",
    icon: "Shapes",
    color: "emerald",
    lessonsCount: 3,
    completedLessons: 0,
    lessons: [
      {
        id: "geometry-circle",
        topicId: "geometry",
        title: "Hình tròn & Đường tròn",
        description: "Các công thức về chu vi, diện tích và phương trình đường tròn",
        duration: "12 phút",
        difficulty: "easy",
        xpReward: 35,
        completed: false,
        formulas: [
          {
            id: "g1",
            name: "Chu vi hình tròn",
            latex: "C = 2\\pi r",
            description: "Chu vi hình tròn bằng 2π nhân bán kính"
          },
          {
            id: "g2",
            name: "Diện tích hình tròn",
            latex: "S = \\pi r^2",
            description: "Diện tích hình tròn bằng π nhân bán kính bình phương"
          },
          {
            id: "g3",
            name: "Phương trình đường tròn",
            latex: "(x - a)^2 + (y - b)^2 = R^2",
            description: "Đường tròn tâm I(a, b) bán kính R"
          }
        ],
        sandboxConfig: {
          type: "circle",
          title: "Khám phá Hình tròn",
          description: "Thay đổi bán kính để quan sát chu vi và diện tích thay đổi realtime",
          formulaLatex: "S = \\pi r^2, \\quad C = 2\\pi r",
          parameters: [
            { name: "r", label: "Bán kính r", min: 0.5, max: 8, step: 0.5, defaultValue: 3 }
          ]
        }
      },
      {
        id: "geometry-triangle",
        topicId: "geometry",
        title: "Tam giác",
        description: "Diện tích, định lý sin, cos và các tính chất đặc biệt",
        duration: "15 phút",
        difficulty: "medium",
        xpReward: 50,
        completed: false,
        formulas: [
          {
            id: "g4",
            name: "Diện tích tam giác (Heron)",
            latex: "S = \\sqrt{p(p-a)(p-b)(p-c)}",
            description: "Với p = (a + b + c) / 2 là nửa chu vi"
          },
          {
            id: "g5",
            name: "Định lý Cosin",
            latex: "c^2 = a^2 + b^2 - 2ab\\cos C",
            description: "Mối quan hệ giữa các cạnh và góc trong tam giác"
          },
          {
            id: "g6",
            name: "Định lý Sin",
            latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R",
            description: "Tỷ số giữa cạnh và sin góc đối luôn bằng 2R (R: bán kính ngoại tiếp)"
          }
        ]
      },
      {
        id: "geometry-vectors",
        topicId: "geometry",
        title: "Véc tơ trong mặt phẳng",
        description: "Phép cộng, trừ, tích vô hướng và ứng dụng véc tơ",
        duration: "20 phút",
        difficulty: "hard",
        xpReward: 70,
        completed: false,
        formulas: [
          {
            id: "g7",
            name: "Độ dài véc tơ",
            latex: "|\\vec{a}| = \\sqrt{x^2 + y^2}",
            description: "Độ dài véc tơ a = (x, y)"
          },
          {
            id: "g8",
            name: "Tích vô hướng",
            latex: "\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 = |\\vec{a}||\\vec{b}|\\cos\\theta",
            description: "Tích vô hướng của hai véc tơ"
          }
        ]
      }
    ]
  },
  {
    id: "calculus",
    title: "Giải tích",
    description: "Giới hạn, đạo hàm, tích phân và ứng dụng",
    icon: "TrendingUp",
    color: "amber",
    lessonsCount: 3,
    completedLessons: 0,
    lessons: [
      {
        id: "calculus-limits",
        topicId: "calculus",
        title: "Giới hạn hàm số",
        description: "Khái niệm giới hạn, các dạng vô định và quy tắc L'Hôpital",
        duration: "15 phút",
        difficulty: "medium",
        xpReward: 50,
        completed: false,
        formulas: [
          {
            id: "c1",
            name: "Định nghĩa giới hạn",
            latex: "\\lim_{x \\to a} f(x) = L",
            description: "Giới hạn của f(x) khi x tiến đến a bằng L"
          },
          {
            id: "c2",
            name: "Giới hạn đáng nhớ",
            latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
            description: "Một trong những giới hạn cơ bản quan trọng nhất"
          },
          {
            id: "c3",
            name: "Quy tắc L'Hôpital",
            latex: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
            description: "Áp dụng khi gặp dạng 0/0 hoặc ∞/∞"
          }
        ]
      },
      {
        id: "calculus-derivatives",
        topicId: "calculus",
        title: "Đạo hàm",
        description: "Quy tắc đạo hàm, đạo hàm hàm hợp và ứng dụng",
        duration: "20 phút",
        difficulty: "medium",
        xpReward: 55,
        completed: false,
        formulas: [
          {
            id: "c4",
            name: "Đạo hàm lũy thừa",
            latex: "(x^n)' = nx^{n-1}",
            description: "Đạo hàm của x mũ n"
          },
          {
            id: "c5",
            name: "Đạo hàm hàm hợp",
            latex: "[f(g(x))]' = f'(g(x)) \\cdot g'(x)",
            description: "Chain rule - Quy tắc chuỗi"
          },
          {
            id: "c6",
            name: "Đạo hàm tích",
            latex: "(uv)' = u'v + uv'",
            description: "Product rule - Đạo hàm của tích hai hàm"
          },
          {
            id: "c7",
            name: "Đạo hàm thương",
            latex: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
            description: "Quotient rule - Đạo hàm của thương hai hàm"
          }
        ],
        sandboxConfig: {
          type: "sine-wave",
          title: "Đạo hàm của hàm sin",
          description: "Thay đổi tham số a và ω trong y = a·sin(ωx) để quan sát đồ thị hàm số và đạo hàm",
          formulaLatex: "y = a\\sin(\\omega x), \\quad y' = a\\omega\\cos(\\omega x)",
          parameters: [
            { name: "a", label: "Biên độ a", min: 0.5, max: 4, step: 0.5, defaultValue: 2 },
            { name: "omega", label: "Tần số ω", min: 0.5, max: 5, step: 0.5, defaultValue: 1 }
          ]
        }
      },
      {
        id: "calculus-integrals",
        topicId: "calculus",
        title: "Tích phân",
        description: "Nguyên hàm, tích phân xác định và ứng dụng tính diện tích",
        duration: "25 phút",
        difficulty: "hard",
        xpReward: 75,
        completed: false,
        formulas: [
          {
            id: "c8",
            name: "Tích phân xác định",
            latex: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
            description: "Newton-Leibniz: Tích phân bằng hiệu nguyên hàm"
          },
          {
            id: "c9",
            name: "Tích phân từng phần",
            latex: "\\int u\\,dv = uv - \\int v\\,du",
            description: "Integration by parts"
          }
        ]
      }
    ]
  },
  {
    id: "trigonometry",
    title: "Lượng giác",
    description: "Hàm lượng giác, công thức biến đổi và phương trình lượng giác",
    icon: "Waves",
    color: "rose",
    lessonsCount: 3,
    completedLessons: 0,
    lessons: [
      {
        id: "trig-basics",
        topicId: "trigonometry",
        title: "Hàm số lượng giác cơ bản",
        description: "Sin, cos, tan, cot và đường tròn lượng giác",
        duration: "15 phút",
        difficulty: "easy",
        xpReward: 40,
        completed: false,
        formulas: [
          {
            id: "t1",
            name: "Hệ thức cơ bản",
            latex: "\\sin^2\\alpha + \\cos^2\\alpha = 1",
            description: "Hệ thức lượng giác cơ bản nhất"
          },
          {
            id: "t2",
            name: "Định nghĩa tan và cot",
            latex: "\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}, \\quad \\cot\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha}",
            description: "Tan bằng sin trên cos, cot bằng cos trên sin"
          },
          {
            id: "t3",
            name: "Hệ thức nâng cao",
            latex: "1 + \\tan^2\\alpha = \\frac{1}{\\cos^2\\alpha}",
            description: "Hệ thức liên hệ tan với cos"
          }
        ],
        sandboxConfig: {
          type: "trigonometry",
          title: "Đường tròn Lượng giác",
          description: "Kéo thanh trượt góc α để quan sát sin, cos trên đường tròn đơn vị",
          formulaLatex: "P(\\cos\\alpha,\\; \\sin\\alpha)",
          parameters: [
            { name: "angle", label: "Góc α (độ)", min: 0, max: 360, step: 5, defaultValue: 45 }
          ]
        }
      },
      {
        id: "trig-transformations",
        topicId: "trigonometry",
        title: "Công thức biến đổi lượng giác",
        description: "Công thức cộng, nhân đôi, hạ bậc",
        duration: "20 phút",
        difficulty: "medium",
        xpReward: 55,
        completed: false,
        formulas: [
          {
            id: "t4",
            name: "Công thức cộng (sin)",
            latex: "\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta",
            description: "Công thức cộng cho hàm sin"
          },
          {
            id: "t5",
            name: "Công thức cộng (cos)",
            latex: "\\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta",
            description: "Công thức cộng cho hàm cos"
          },
          {
            id: "t6",
            name: "Công thức nhân đôi",
            latex: "\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha, \\quad \\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha",
            description: "Công thức nhân đôi cho sin và cos"
          }
        ]
      },
      {
        id: "trig-equations",
        topicId: "trigonometry",
        title: "Phương trình lượng giác",
        description: "Giải các phương trình lượng giác cơ bản và nâng cao",
        duration: "22 phút",
        difficulty: "hard",
        xpReward: 70,
        completed: false,
        formulas: [
          {
            id: "t7",
            name: "Phương trình sin",
            latex: "\\sin x = a \\Leftrightarrow x = \\begin{cases} \\arcsin a + k2\\pi \\\\ \\pi - \\arcsin a + k2\\pi \\end{cases}",
            description: "Nghiệm tổng quát của phương trình sin x = a"
          },
          {
            id: "t8",
            name: "Phương trình cos",
            latex: "\\cos x = a \\Leftrightarrow x = \\pm \\arccos a + k2\\pi",
            description: "Nghiệm tổng quát của phương trình cos x = a"
          }
        ]
      }
    ]
  }
];

// ============================================================
// QUIZ QUESTIONS
// ============================================================

export const quizQuestions: QuizQuestion[] = [
  // --- Algebra ---
  {
    id: "q1",
    topicId: "algebra",
    type: "multiple-choice",
    difficulty: "easy",
    question: "Phương trình x² - 5x + 6 = 0 có hai nghiệm là:",
    questionLatex: "x^2 - 5x + 6 = 0",
    optionsLatex: ["x = 2, \\; x = 3", "x = -2, \\; x = -3", "x = 1, \\; x = 6", "x = -1, \\; x = -6"],
    correctAnswer: 0,
    hints: [
      "Hãy thử phân tích tam thức thành tích hai nhị thức",
      "Tìm hai số có tổng bằng 5 và tích bằng 6"
    ],
    explanation: "Phân tích: x² - 5x + 6 = (x - 2)(x - 3) = 0, suy ra x = 2 hoặc x = 3",
    explanationLatex: "x^2 - 5x + 6 = (x-2)(x-3) = 0 \\Rightarrow x = 2 \\text{ hoặc } x = 3",
    xpReward: 10
  },
  {
    id: "q2",
    topicId: "algebra",
    type: "fill-blank",
    difficulty: "medium",
    question: "Biệt thức Δ của phương trình 2x² + 3x - 5 = 0 bằng bao nhiêu?",
    questionLatex: "\\Delta = b^2 - 4ac = 3^2 - 4(2)(-5) = \\text{?}",
    correctAnswer: "49",
    blankAnswer: "49",
    hints: [
      "Δ = b² - 4ac với a = 2, b = 3, c = -5",
      "Δ = 9 - 4(2)(-5) = 9 + 40"
    ],
    explanation: "Δ = 3² - 4(2)(-5) = 9 + 40 = 49",
    explanationLatex: "\\Delta = 3^2 - 4 \\cdot 2 \\cdot (-5) = 9 + 40 = 49",
    xpReward: 15
  },
  {
    id: "q3",
    topicId: "algebra",
    type: "step-solve",
    difficulty: "medium",
    question: "Giải phương trình: 3x² - 12x + 9 = 0",
    questionLatex: "3x^2 - 12x + 9 = 0",
    correctAnswer: ["3", "36", "108", "0", "x = 1 hoặc x = 3"],
    hints: ["Xác định a, b, c", "Tính Δ = b² - 4ac"],
    explanation: "Chia cả hai vế cho 3 → x² - 4x + 3 = 0 → (x-1)(x-3) = 0",
    xpReward: 25,
    steps: [
      { instruction: "Xác định hệ số a", latex: "a = ?", answer: "3", hint: "Hệ số của x²" },
      { instruction: "Tính b²", latex: "b^2 = (-12)^2 = ?", answer: "144", hint: "b = -12, b² = ?" },
      { instruction: "Tính 4ac", latex: "4ac = 4 \\cdot 3 \\cdot 9 = ?", answer: "108", hint: "4 × 3 × 9" },
      { instruction: "Tính Δ", latex: "\\Delta = b^2 - 4ac = 144 - 108 = ?", answer: "36", hint: "144 - 108 = ?" },
      { instruction: "Tìm nghiệm", latex: "x = \\frac{12 \\pm \\sqrt{36}}{6} = \\frac{12 \\pm 6}{6}", answer: "x = 1 hoặc x = 3", hint: "x₁ = (12-6)/6, x₂ = (12+6)/6" }
    ]
  },
  {
    id: "q4",
    topicId: "algebra",
    type: "drag-drop",
    difficulty: "medium",
    question: "Sắp xếp các bước giải phương trình bậc hai theo đúng thứ tự:",
    correctAnswer: ["d1", "d2", "d3", "d4"],
    hints: ["Bước đầu tiên luôn là xác định hệ số"],
    explanation: "Quy trình: Xác định a,b,c → Tính Δ → Kiểm tra dấu Δ → Tính nghiệm",
    xpReward: 20,
    dragItems: [
      { id: "d1", content: "Xác định a, b, c" },
      { id: "d2", content: "Tính Δ = b² - 4ac" },
      { id: "d3", content: "Kiểm tra dấu Δ" },
      { id: "d4", content: "Tính nghiệm x₁, x₂" }
    ],
    dropZones: [
      { id: "z1", label: "Bước 1", correctItemId: "d1" },
      { id: "z2", label: "Bước 2", correctItemId: "d2" },
      { id: "z3", label: "Bước 3", correctItemId: "d3" },
      { id: "z4", label: "Bước 4", correctItemId: "d4" }
    ]
  },
  // --- Geometry ---
  {
    id: "q5",
    topicId: "geometry",
    type: "multiple-choice",
    difficulty: "easy",
    question: "Diện tích hình tròn có bán kính r = 5 là:",
    questionLatex: "S = \\pi r^2 = \\pi \\cdot 5^2 = ?",
    optionsLatex: ["25\\pi", "10\\pi", "50\\pi", "5\\pi"],
    correctAnswer: 0,
    hints: ["Áp dụng công thức S = πr²", "S = π × 25"],
    explanation: "S = π × 5² = 25π ≈ 78.54",
    explanationLatex: "S = \\pi \\times 5^2 = 25\\pi \\approx 78.54",
    xpReward: 10
  },
  {
    id: "q6",
    topicId: "geometry",
    type: "fill-blank",
    difficulty: "medium",
    question: "Cho tam giác có ba cạnh a = 3, b = 4, c = 5. Tính diện tích (giá trị chính xác):",
    questionLatex: "S = \\sqrt{p(p-a)(p-b)(p-c)}, \\quad p = \\frac{3+4+5}{2} = 6",
    correctAnswer: "6",
    blankAnswer: "6",
    hints: [
      "p = (3+4+5)/2 = 6",
      "S = √(6 × 3 × 2 × 1) = √36"
    ],
    explanation: "p = 6, S = √(6×3×2×1) = √36 = 6. Đây là tam giác vuông 3-4-5!",
    explanationLatex: "S = \\sqrt{6 \\times 3 \\times 2 \\times 1} = \\sqrt{36} = 6",
    xpReward: 15
  },
  // --- Calculus ---
  {
    id: "q7",
    topicId: "calculus",
    type: "multiple-choice",
    difficulty: "easy",
    question: "Đạo hàm của f(x) = 3x⁴ là:",
    questionLatex: "f(x) = 3x^4 \\Rightarrow f'(x) = ?",
    optionsLatex: ["12x^3", "3x^3", "12x^4", "4x^3"],
    correctAnswer: 0,
    hints: ["Áp dụng (xⁿ)' = nxⁿ⁻¹", "f'(x) = 3 × 4 × x³"],
    explanation: "f'(x) = 3 × 4x³ = 12x³",
    explanationLatex: "f'(x) = 3 \\cdot 4x^{4-1} = 12x^3",
    xpReward: 10
  },
  {
    id: "q8",
    topicId: "calculus",
    type: "multiple-choice",
    difficulty: "medium",
    question: "Tích phân xác định sau bằng bao nhiêu?",
    questionLatex: "\\int_0^2 (3x^2 + 1)\\,dx = ?",
    optionsLatex: ["10", "8", "12", "14"],
    correctAnswer: 0,
    hints: [
      "Tìm nguyên hàm: F(x) = x³ + x",
      "Áp dụng Newton-Leibniz: F(2) - F(0)"
    ],
    explanation: "F(x) = x³ + x. ∫₀² = F(2) - F(0) = (8+2) - 0 = 10",
    explanationLatex: "F(x) = x^3 + x \\Rightarrow F(2) - F(0) = (8+2) - 0 = 10",
    xpReward: 15
  },
  // --- Trigonometry ---
  {
    id: "q9",
    topicId: "trigonometry",
    type: "multiple-choice",
    difficulty: "easy",
    question: "Giá trị sin(30°) bằng:",
    questionLatex: "\\sin 30° = ?",
    optionsLatex: ["\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}", "1"],
    correctAnswer: 0,
    hints: ["Nhớ bảng giá trị lượng giác đặc biệt"],
    explanation: "sin(30°) = 1/2. Đây là giá trị lượng giác đặc biệt cần ghi nhớ.",
    explanationLatex: "\\sin 30° = \\frac{1}{2}",
    xpReward: 10
  },
  {
    id: "q10",
    topicId: "trigonometry",
    type: "fill-blank",
    difficulty: "medium",
    question: "Áp dụng công thức nhân đôi: sin(2 × 30°) = sin(60°) = ?",
    questionLatex: "\\sin 60° = 2\\sin 30° \\cos 30° = 2 \\cdot \\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2} = ?",
    correctAnswer: "√3/2",
    blankAnswer: "√3/2",
    hints: [
      "sin(2α) = 2sinα·cosα",
      "sin30° = 1/2, cos30° = √3/2"
    ],
    explanation: "sin(60°) = 2 × (1/2) × (√3/2) = √3/2 ≈ 0.866",
    explanationLatex: "\\sin 60° = 2 \\cdot \\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}",
    xpReward: 15
  },
  {
    id: "q11",
    topicId: "algebra",
    type: "multiple-choice",
    difficulty: "hard",
    question: "Tổng hai nghiệm của phương trình 2x² - 7x + 3 = 0 bằng:",
    questionLatex: "x_1 + x_2 = ?",
    optionsLatex: ["\\frac{7}{2}", "-\\frac{7}{2}", "\\frac{3}{2}", "7"],
    correctAnswer: 0,
    hints: ["Sử dụng Vieta: x₁ + x₂ = -b/a"],
    explanation: "Theo Vieta: x₁ + x₂ = -b/a = -(-7)/2 = 7/2",
    explanationLatex: "x_1 + x_2 = -\\frac{b}{a} = -\\frac{-7}{2} = \\frac{7}{2}",
    xpReward: 15
  },
  {
    id: "q12",
    topicId: "calculus",
    type: "step-solve",
    difficulty: "hard",
    question: "Tính đạo hàm của hàm số y = (2x + 1)³",
    questionLatex: "y = (2x+1)^3 \\Rightarrow y' = ?",
    correctAnswer: ["u = 2x + 1", "3u²", "2", "6(2x+1)²"],
    hints: ["Đặt u = 2x + 1, sử dụng quy tắc chuỗi"],
    explanation: "Đặt u = 2x+1, y = u³ → y' = 3u² × u' = 3(2x+1)² × 2 = 6(2x+1)²",
    xpReward: 25,
    steps: [
      { instruction: "Đặt u = ?", latex: "u = ?", answer: "2x + 1", hint: "Biểu thức trong ngoặc" },
      { instruction: "Đạo hàm ngoài: (u³)' = ?", latex: "(u^3)' = ?", answer: "3u²", hint: "Áp dụng (xⁿ)' = nxⁿ⁻¹" },
      { instruction: "Đạo hàm trong: u' = (2x+1)' = ?", latex: "u' = ?", answer: "2", hint: "Đạo hàm của 2x + 1" },
      { instruction: "Kết quả y' = ?", latex: "y' = 3u^2 \\cdot u' = ?", answer: "6(2x+1)²", hint: "Nhân 3u² × 2 rồi thay u" }
    ]
  }
];

// ============================================================
// BADGES
// ============================================================

export const badges: Badge[] = [
  {
    id: "b1", name: "Người Bắt Đầu", description: "Hoàn thành bài học đầu tiên",
    icon: "Sparkles", requirement: "1 lesson completed", unlocked: true, unlockedAt: "2024-01-15",
    category: "learning", xpReward: 20
  },
  {
    id: "b2", name: "Nhà Đại Số", description: "Hoàn thành tất cả bài học Đại số",
    icon: "Variable", requirement: "All algebra lessons", unlocked: false,
    category: "learning", xpReward: 100
  },
  {
    id: "b3", name: "Chuỗi 7 ngày", description: "Duy trì chuỗi học 7 ngày liên tục",
    icon: "Flame", requirement: "7-day streak", unlocked: true, unlockedAt: "2024-01-20",
    category: "streak", xpReward: 50
  },
  {
    id: "b4", name: "Chuỗi 30 ngày", description: "Duy trì chuỗi học 30 ngày liên tục",
    icon: "Trophy", requirement: "30-day streak", unlocked: false,
    category: "streak", xpReward: 200
  },
  {
    id: "b5", name: "Quiz Master", description: "Đạt 100% trong 5 bài quiz",
    icon: "Crown", requirement: "5 perfect quizzes", unlocked: false,
    category: "quiz", xpReward: 150
  },
  {
    id: "b6", name: "Tốc Độ Ánh Sáng", description: "Đạt trên 500 điểm trong Speed Formula",
    icon: "Zap", requirement: "500+ in Speed Formula", unlocked: false,
    category: "game", xpReward: 80
  },
  {
    id: "b7", name: "Nhà Cân Bằng", description: "Giải 10 bài Algebra Balance",
    icon: "Scale", requirement: "10 balance puzzles", unlocked: false,
    category: "game", xpReward: 80
  },
  {
    id: "b8", name: "Nhà Hình Học", description: "Hoàn thành tất cả bài Hình học",
    icon: "Shapes", requirement: "All geometry lessons", unlocked: false,
    category: "learning", xpReward: 100
  },
  {
    id: "b9", name: "Chiến Thần Quiz", description: "Hoàn thành 20 câu quiz",
    icon: "Target", requirement: "20 quiz answers", unlocked: false,
    category: "quiz", xpReward: 60
  },
  {
    id: "b10", name: "Nhà Thám Hiểm", description: "Mở tất cả 4 chủ đề",
    icon: "Compass", requirement: "Visit all topics", unlocked: true, unlockedAt: "2024-01-18",
    category: "special", xpReward: 30
  }
];

// ============================================================
// SPEED FORMULA FLASHCARDS
// ============================================================

export const flashcardQuestions: FlashcardQuestion[] = [
  { formula: "S = \\pi r^2", formulaName: "Diện tích hình tròn", options: ["Chu vi hình tròn", "Diện tích hình tròn", "Thể tích hình cầu", "Diện tích hình vuông"], correctIndex: 1 },
  { formula: "C = 2\\pi r", formulaName: "Chu vi hình tròn", options: ["Diện tích hình tròn", "Đường kính", "Chu vi hình tròn", "Chu vi elip"], correctIndex: 2 },
  { formula: "(x^n)' = nx^{n-1}", formulaName: "Đạo hàm lũy thừa", options: ["Tích phân lũy thừa", "Đạo hàm lũy thừa", "Công thức nhị thức", "Đạo hàm logarit"], correctIndex: 1 },
  { formula: "\\sin^2\\alpha + \\cos^2\\alpha = 1", formulaName: "Hệ thức lượng giác cơ bản", options: ["Công thức nhân đôi", "Hệ thức lượng giác cơ bản", "Định lý Pytago", "Công thức cộng"], correctIndex: 1 },
  { formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", formulaName: "Công thức nghiệm PT bậc hai", options: ["Công thức nghiệm PT bậc hai", "Công thức Vieta", "Biệt thức", "Công thức Cramer"], correctIndex: 0 },
  { formula: "\\int_a^b f(x)dx = F(b) - F(a)", formulaName: "Newton-Leibniz", options: ["Định lý giá trị trung bình", "Quy tắc L'Hôpital", "Newton-Leibniz", "Định lý Taylor"], correctIndex: 2 },
  { formula: "\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha", formulaName: "Công thức nhân đôi sin", options: ["Công thức cộng sin", "Công thức nhân đôi sin", "Công thức hạ bậc", "Công thức nhân ba"], correctIndex: 1 },
  { formula: "c^2 = a^2 + b^2 - 2ab\\cos C", formulaName: "Định lý Cosin", options: ["Định lý Pytago", "Định lý Sin", "Định lý Cosin", "Bất đẳng thức tam giác"], correctIndex: 2 },
  { formula: "(uv)' = u'v + uv'", formulaName: "Đạo hàm tích", options: ["Đạo hàm tích", "Đạo hàm thương", "Đạo hàm hàm hợp", "Tích phân từng phần"], correctIndex: 0 },
  { formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1", formulaName: "Giới hạn đáng nhớ", options: ["Giới hạn vô cùng", "Giới hạn đáng nhớ", "Quy tắc L'Hôpital", "Chuỗi Taylor"], correctIndex: 1 },
  { formula: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}", formulaName: "Đạo hàm thương", options: ["Đạo hàm tích", "Đạo hàm hàm hợp", "Tích phân từng phần", "Đạo hàm thương"], correctIndex: 3 },
  { formula: "S = \\sqrt{p(p-a)(p-b)(p-c)}", formulaName: "Công thức Heron", options: ["Diện tích tam giác (Heron)", "Bất đẳng thức tam giác", "Định lý Pytago", "Chu vi tam giác"], correctIndex: 0 },
  { formula: "\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta", formulaName: "Công thức cộng cos", options: ["Công thức nhân đôi cos", "Công thức trừ cos", "Công thức cộng cos", "Công thức hạ bậc"], correctIndex: 2 },
  { formula: "\\int u\\,dv = uv - \\int v\\,du", formulaName: "Tích phân từng phần", options: ["Đạo hàm tích", "Tích phân từng phần", "Newton-Leibniz", "Tích phân bất định"], correctIndex: 1 },
  { formula: "|\\vec{a}| = \\sqrt{x^2 + y^2}", formulaName: "Độ dài véc tơ", options: ["Tích vô hướng", "Tích có hướng", "Độ dài véc tơ", "Khoảng cách hai điểm"], correctIndex: 2 },
];

// ============================================================
// ALGEBRA BALANCE CHALLENGES
// ============================================================

export const balanceChallenges: BalanceChallenge[] = [
  { id: "bc1", difficulty: "easy", equation: "x + 3 = 7", leftSide: "x + 3", rightSide: "7", missingValue: 4, description: "Tìm x để cân thăng bằng" },
  { id: "bc2", difficulty: "easy", equation: "2x = 10", leftSide: "2x", rightSide: "10", missingValue: 5, description: "Tìm x để cân thăng bằng" },
  { id: "bc3", difficulty: "easy", equation: "x - 2 = 5", leftSide: "x - 2", rightSide: "5", missingValue: 7, description: "Tìm x để cân thăng bằng" },
  { id: "bc4", difficulty: "medium", equation: "3x + 1 = 16", leftSide: "3x + 1", rightSide: "16", missingValue: 5, description: "Tìm x để cân thăng bằng" },
  { id: "bc5", difficulty: "medium", equation: "2x - 4 = 8", leftSide: "2x - 4", rightSide: "8", missingValue: 6, description: "Tìm x để cân thăng bằng" },
  { id: "bc6", difficulty: "medium", equation: "4x + 2 = 18", leftSide: "4x + 2", rightSide: "18", missingValue: 4, description: "Tìm x để cân thăng bằng" },
  { id: "bc7", difficulty: "hard", equation: "5x - 3 = 2x + 9", leftSide: "5x - 3", rightSide: "2x + 9", missingValue: 4, description: "Tìm x để cân thăng bằng" },
  { id: "bc8", difficulty: "hard", equation: "3(x + 2) = 21", leftSide: "3(x + 2)", rightSide: "21", missingValue: 5, description: "Tìm x để cân thăng bằng" },
  { id: "bc9", difficulty: "hard", equation: "2(x - 1) + 3 = 13", leftSide: "2(x - 1) + 3", rightSide: "13", missingValue: 6, description: "Tìm x để cân thăng bằng" },
  { id: "bc10", difficulty: "hard", equation: "4(x + 1) - 2 = 3x + 5", leftSide: "4(x + 1) - 2", rightSide: "3x + 5", missingValue: 3, description: "Tìm x để cân thăng bằng" },
];

// ============================================================
// USER STATS (Mock)
// ============================================================

export const initialUserStats = {
  xp: 285,
  streak: 5,
  totalLessonsCompleted: 1,
  totalQuizzesCompleted: 3,
  totalGamesPlayed: 2,
  quizAccuracy: 78,
  bestSpeedFormulaScore: 320,
  bestBalanceScore: 7,
  recentActivity: [
    { type: "lesson" as const, title: "Phương trình bậc hai", date: "Hôm nay", xp: 50 },
    { type: "quiz" as const, title: "Quiz Đại số - Cơ bản", date: "Hôm nay", xp: 35 },
    { type: "game" as const, title: "Speed Formula", date: "Hôm qua", xp: 40 },
    { type: "lesson" as const, title: "Hàm số lượng giác", date: "2 ngày trước", xp: 40 },
    { type: "badge" as const, title: "Đạt huy hiệu Nhà Thám Hiểm", date: "3 ngày trước", xp: 30 },
  ],
  streakDays: [true, true, true, true, true, false, false], // last 7 days, today first
};
