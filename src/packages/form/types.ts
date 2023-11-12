import { RuleItem } from 'async-validator';

export type FormRuleItem = RuleItem & { triggerType: 'change' | 'blur' | 'none' };
