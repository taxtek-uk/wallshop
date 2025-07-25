// Utility functions for Smart Wall Builder module calculations

export interface ModuleConfiguration {
  modules: number[];
  totalWidth: number;
  description: string;
  isOptimal: boolean;
  moduleCount: number;
}

export interface WallDimensions {
  width: number;
  height: number;
}

export interface SpecialRequirements {
  hasTV: boolean;
  hasFire: boolean;
}

// Available module widths in mm
export const AVAILABLE_WIDTHS = [400, 600, 800, 1000, 1100, 1200];

// Standard configurations for special requirements
export const TV_MODULE_WIDTH = 2000; // 2x 1000mm modules
export const FIRE_MODULE_WIDTH = 2000; // 2x 1000mm modules

/**
 * Calculate the best module combinations for a given wall width
 */
export function calculateModuleRecommendations(
  wallDimensions: WallDimensions,
  specialRequirements: SpecialRequirements
): ModuleConfiguration[] {
  const targetWidth = wallDimensions.width;
  const recommendations: ModuleConfiguration[] = [];

  // Special case for TV (requires 2x 1000mm modules)
  if (specialRequirements.hasTV) {
    const tvConfigs = calculateTVConfigurations(targetWidth);
    recommendations.push(...tvConfigs);
  }

  // Special case for Fire (requires 2x 1000mm modules)
  if (specialRequirements.hasFire) {
    const fireConfigs = calculateFireConfigurations(targetWidth);
    recommendations.push(...fireConfigs);
  }

  // General recommendations (when no special requirements)
  if (!specialRequirements.hasTV && !specialRequirements.hasFire) {
    const generalConfigs = calculateGeneralConfigurations(targetWidth);
    recommendations.push(...generalConfigs);
  }

  // Sort by optimality and module count
  return recommendations
    .sort((a, b) => {
      if (a.isOptimal && !b.isOptimal) return -1;
      if (!a.isOptimal && b.isOptimal) return 1;
      if (a.moduleCount !== b.moduleCount) return a.moduleCount - b.moduleCount;
      return Math.abs(a.totalWidth - targetWidth) - Math.abs(b.totalWidth - targetWidth);
    })
    .slice(0, 5); // Return top 5 recommendations
}

/**
 * Calculate TV configurations (center TV with side modules)
 */
function calculateTVConfigurations(targetWidth: number): ModuleConfiguration[] {
  const configurations: ModuleConfiguration[] = [];
  const tvModules = [1000, 1000]; // TV requires 2x 1000mm
  const remainingWidth = targetWidth - TV_MODULE_WIDTH;

  if (remainingWidth <= 0) {
    // Wall too small for TV configuration
    return configurations;
  }

  const sideWidth = remainingWidth / 2;
  const sideConfigs = findBestModuleCombination(sideWidth, 3); // Max 3 modules per side

  sideConfigs.forEach(sideConfig => {
    const totalModules = [...sideConfig.modules, ...tvModules, ...sideConfig.modules];
    const totalWidth = totalModules.reduce((sum, w) => sum + w, 0);
    const isOptimal = Math.abs(totalWidth - targetWidth) <= 100;

    configurations.push({
      modules: totalModules,
      totalWidth,
      description: `TV Setup: ${sideConfig.modules.join('+')}mm + TV(1000+1000)mm + ${sideConfig.modules.join('+')}mm`,
      isOptimal,
      moduleCount: totalModules.length
    });
  });

  return configurations;
}

/**
 * Calculate Fire configurations (center fire with side modules)
 */
function calculateFireConfigurations(targetWidth: number): ModuleConfiguration[] {
  const configurations: ModuleConfiguration[] = [];
  const fireModules = [1000, 1000]; // Fire requires 2x 1000mm
  const remainingWidth = targetWidth - FIRE_MODULE_WIDTH;

  if (remainingWidth <= 0) {
    // Wall too small for fire configuration
    return configurations;
  }

  const sideWidth = remainingWidth / 2;
  const sideConfigs = findBestModuleCombination(sideWidth, 3); // Max 3 modules per side

  sideConfigs.forEach(sideConfig => {
    const totalModules = [...sideConfig.modules, ...fireModules, ...sideConfig.modules];
    const totalWidth = totalModules.reduce((sum, w) => sum + w, 0);
    const isOptimal = Math.abs(totalWidth - targetWidth) <= 100;

    configurations.push({
      modules: totalModules,
      totalWidth,
      description: `Fire Setup: ${sideConfig.modules.join('+')}mm + Fire(1000+1000)mm + ${sideConfig.modules.join('+')}mm`,
      isOptimal,
      moduleCount: totalModules.length
    });
  });

  return configurations;
}

/**
 * Calculate general configurations (no special requirements)
 */
function calculateGeneralConfigurations(targetWidth: number): ModuleConfiguration[] {
  const configurations: ModuleConfiguration[] = [];
  const generalConfigs = findBestModuleCombination(targetWidth, 6); // Max 6 modules

  generalConfigs.forEach(config => {
    const isOptimal = Math.abs(config.totalWidth - targetWidth) <= 100;
    
    configurations.push({
      modules: config.modules,
      totalWidth: config.totalWidth,
      description: `${config.modules.join(' + ')}mm modules`,
      isOptimal,
      moduleCount: config.modules.length
    });
  });

  return configurations;
}

/**
 * Find the best module combinations for a target width
 */
function findBestModuleCombination(
  targetWidth: number, 
  maxModules: number = 6
): { modules: number[]; totalWidth: number }[] {
  const combinations: { modules: number[]; totalWidth: number }[] = [];

  // Generate combinations up to maxModules
  for (let count = 1; count <= maxModules; count++) {
    generateCombinations(AVAILABLE_WIDTHS, count, targetWidth, combinations);
  }

  // Sort by how close to target width and prefer fewer modules
  return combinations
    .filter(combo => combo.totalWidth <= targetWidth + 200) // Allow some tolerance
    .sort((a, b) => {
      const diffA = Math.abs(a.totalWidth - targetWidth);
      const diffB = Math.abs(b.totalWidth - targetWidth);
      if (diffA === diffB) {
        return a.modules.length - b.modules.length;
      }
      return diffA - diffB;
    })
    .slice(0, 10); // Return top 10 combinations
}

/**
 * Recursively generate module combinations
 */
function generateCombinations(
  widths: number[],
  count: number,
  target: number,
  results: { modules: number[]; totalWidth: number }[]
): void {
  if (count === 1) {
    widths.forEach(width => {
      if (width <= target + 200) { // Allow some tolerance
        results.push({
          modules: [width],
          totalWidth: width
        });
      }
    });
    return;
  }

  widths.forEach(width => {
    if (width <= target) {
      const subCombinations: { modules: number[]; totalWidth: number }[] = [];
      generateCombinations(widths, count - 1, target - width, subCombinations);
      
      subCombinations.forEach(combo => {
        const newCombo = {
          modules: [width, ...combo.modules],
          totalWidth: width + combo.totalWidth
        };
        if (newCombo.totalWidth <= target + 200) {
          results.push(newCombo);
        }
      });
    }
  });
}

/**
 * Validate if a module can fit in the remaining space
 */
export function canModuleFit(
  moduleWidth: number,
  currentWidth: number,
  wallWidth: number,
  tolerance: number = 100
): boolean {
  return (currentWidth + moduleWidth) <= (wallWidth + tolerance);
}

/**
 * Calculate wall utilization percentage
 */
export function calculateUtilization(
  currentWidth: number,
  wallWidth: number
): number {
  return (currentWidth / wallWidth) * 100;
}

/**
 * Get module fit status
 */
export function getModuleFitStatus(
  moduleWidth: number,
  remainingWidth: number
): 'optimal' | 'fits' | 'too-large' {
  if (moduleWidth > remainingWidth + 100) {
    return 'too-large';
  }
  if (moduleWidth <= remainingWidth && moduleWidth >= remainingWidth - 200) {
    return 'optimal';
  }
  return 'fits';
}

/**
 * Calculate the optimal module sequence for a user's example (5.7m wall)
 */
export function calculateExampleConfiguration(): ModuleConfiguration {
  // User's example: 5.7m wall with TV
  const wallWidth = 5700; // 5.7m in mm
  const tvModules = [1000, 1000]; // TV modules
  const remainingWidth = wallWidth - 2000; // 3.7m remaining
  const sideWidth = remainingWidth / 2; // 1.85m per side

  // Best fit for 1.85m: 1000mm + 800mm = 1800mm (50mm gap)
  const sideModules = [1000, 800];
  const totalModules = [...sideModules, ...tvModules, ...sideModules];

  return {
    modules: totalModules,
    totalWidth: totalModules.reduce((sum, w) => sum + w, 0),
    description: "Example: 1000+800mm + TV(1000+1000)mm + 800+1000mm",
    isOptimal: true,
    moduleCount: totalModules.length
  };
}

