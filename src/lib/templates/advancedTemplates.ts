
import { BookTemplate } from './templateTypes';
import { BASIC_TEMPLATES } from './basicTemplates';
import { PRO_TEMPLATES } from './proTemplates';
import { ULTIMATE_TEMPLATES } from './ultimateTemplates';

export { BookTemplate } from './templateTypes';

export const ADVANCED_TEMPLATES: BookTemplate[] = [
  ...BASIC_TEMPLATES,
  ...PRO_TEMPLATES,
  ...ULTIMATE_TEMPLATES
];

export const getTemplatesByTier = (tier: string): BookTemplate[] => {
  return ADVANCED_TEMPLATES.filter(template => {
    switch (tier) {
      case 'Free':
        return false; // No templates for free tier
      case 'Basic':
        return template.tier === 'Basic';
      case 'Pro':
        return template.tier === 'Basic' || template.tier === 'Pro';
      case 'Ultimate':
        return true; // All templates available
      default:
        return false;
    }
  });
};

export const getTemplateById = (id: string): BookTemplate | undefined => {
  return ADVANCED_TEMPLATES.find(template => template.id === id);
};
