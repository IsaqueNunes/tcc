import { Tree, getProjects, updateProjectConfiguration } from '@nx/devkit';

/**
 * This migration adds dependsOn to project.json.
 *
 */
export default async function update(tree: Tree) {
  const projects = getProjects(tree);

  for (const [name, config] of projects.entries()) {
    if (config.targets?.['run-android']?.executor === '@nx/react-native:run-android') {
      config.targets['run-android'].dependsOn = ['ensure-symlink', 'sync-deps'];

      updateProjectConfiguration(tree, name, config);
    }
  }
}
