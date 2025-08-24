import { Category } from './category.interface';
import { Location } from './location.interface';

export interface JobFilters {
  categories: Category[];
  locations: Location[];
}
