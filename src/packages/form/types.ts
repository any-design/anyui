import type { RuleItem } from 'async-validator';

export type FormRuleItem = RuleItem & { triggerType?: 'change' | 'blur' | 'none' };
