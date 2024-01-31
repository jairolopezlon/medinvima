/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable max-params */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-magic-numbers */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import path from 'path';
import { stat } from 'node:fs';

const MAIN_PATH = new URL( '.', import.meta.url ).pathname.slice( 1 );
const PATH_COMPONENTS = path.join( MAIN_PATH, 'src', 'stories' );

const FOLDERS_NAME = {
  atoms: 'atoms',
  molecules: 'molecules',
  organisms: 'organisms',
  pages: 'pages',
  templates: 'templates',
}

const FILE_OPTIONS = [
  { name: 'tsx component', value: 'tsx' },
  { name: 'storybook file', value: 'storybook' },
  { name: 'test file', value: 'test' },
  { name: 'style css file', value: 'css' },
];

const FILE_EXTENSION = {
  css: 'module.css',
  storybook: 'stories.tsx',
  test: 'test.tsx',
  tsx: 'tsx',
}

const FILE_CONTENT = {
  css: ( { componentName } ) => `.${ componentName.toLowerCase() }{display:flex;}`,
  storybook: ( { componentName, componentType } ) => `import type { Meta, StoryObj } from '@storybook/react'

import ${ componentName } from './${ componentName }'

const meta: Meta<typeof ${ componentName }> = {
  argTypes: {},
  component: ${ componentName },
  tags: ['autodocs'],
  title: '${ componentType }/${ componentName }',
}

export default meta
type Story = StoryObj<typeof ${ componentName }>

export const Default: Story = {}`,
  test: ( { componentName, componentType } ) => `describe('Test of "${ componentType }/${ componentName }"', () => {
  it('Failed test', () => {
    expect(false).toBe(true)
  })
})`,
  tsx: ( { componentName, fileTypesToCreate } ) => {
    const includeCSS = fileTypesToCreate.includes( 'css' );
    return `${ includeCSS === true ? `import styles from './${ componentName }.module.css'\n` : '' }
interface Props {
  readonly customClass?: string
}

export default function ${ componentName }({customClass}:Props): JSX.Element {
  return (
    <div className={\`${ includeCSS === true ? `$\{styles.${ componentName.toLowerCase() }}` : '' } \${customClass} \`}>
      <h1>${ componentName }</h1>
    </div>
  )
}`},
}

const Q_COMPONENT_TYPE = [
  {
    choices: [ FOLDERS_NAME.atoms, FOLDERS_NAME.molecules, FOLDERS_NAME.organisms, FOLDERS_NAME.templates, FOLDERS_NAME.pages ],
    message: 'Select type of component',
    name: 'componentType',
    type: 'list',
  }
];

const Q_COMPONENT_NAME = [
  {
    message: 'Enter component name',
    name: 'componentName',
    type: 'input',
    validate: function ( input ) {
      const done = this.async();
      const validPattern = /^[A-Z][a-zA-Z0-9-_]{2,}$/u;
      if ( !validPattern.test( input ) ) {
        done( 'The name of component must be a validate name of "react" or "nextjs". use upper camel case' );
      }
      done( null, true );
    }
  }
]

const Q_INCLUDE_FILE_TYPES = [
  {
    choices: FILE_OPTIONS,
    default: [ 'tsx', 'storybook' ],
    message: 'Select file types to create',
    name: 'fileTypesToCreate',
    type: 'checkbox',
  },
]

function getPathFiles( pathComponent, fileTypesToCreate, componentName ) {
  return fileTypesToCreate.map( fileType => {
    const fileName = `${ componentName }.${ FILE_EXTENSION[ fileType ] }`
    return path.join( pathComponent, fileName );
  } );
}

function getComponentName() {
  try {
    return inquirer.prompt( Q_COMPONENT_NAME );
  } catch ( error ) {
    throw new Error( `Error in getComponentName:\n\t${ error.message }` );
  }
}

function getComponenType() {
  try {
    return inquirer.prompt( Q_COMPONENT_TYPE );
  } catch ( error ) {
    throw new Error( `Error in getComponentType:\n\t${ error.message }` );
  }
}

function getFilesTypeToCreate() {
  try {
    return inquirer.prompt( Q_INCLUDE_FILE_TYPES );
  } catch ( error ) {
    throw new Error( `Error in getFilesTypeToCreate:\n\t${ error.message }` );
  }
}

async function createFiles( fileTypesToCreate, pathComponentFiles, componentName, componentType ) {
  try {
    for ( const index of pathComponentFiles.keys() ) {

      const filePath = pathComponentFiles[ index ];
      const fileExisting = await fileExist( filePath );

      if ( fileExisting === true ) {
        throw new Error( `file ${ filePath } already exist, validate before build path` );
      }
      const fileContent = FILE_CONTENT[ fileTypesToCreate[ index ] ]( { componentName, componentType, fileTypesToCreate } )
      await fs.writeFile( filePath, fileContent );
    }
  } catch ( error ) {
    throw new Error( `Error in createFiles:\n\t${ error }` );
  }
}

async function fileExist( pathToValidate ) {
  return await new Promise( ( resolve ) => {
    stat( pathToValidate, ( error ) => {
      if ( error ) {
        resolve( false )
      } else {
        resolve( true )
      }
    } )
  } )
}

async function updateBarrel( { barrelPath, componentName } ) {
  try {
    const barrelFilePath = path.join( barrelPath, 'index.ts' );
    const barrelExisting = await fileExist( barrelFilePath );
    const newImportLine = `export { default as ${ componentName } } from './${ componentName }/${ componentName }'`
    if ( barrelExisting === true ) {
      const barrelContent = await fs.readFile( barrelFilePath, 'utf-8' );
      const barrelContentArray = barrelContent.trim().split( '\n' );
      barrelContentArray.push( newImportLine );
      const barrelContentString = barrelContentArray.sort().join( '\n' );
      await fs.writeFile( barrelFilePath, `${ barrelContentString }\n` );
    } else {
      await fs.writeFile( barrelFilePath, `${ newImportLine }\n` );
    }
  } catch ( error ) {
    throw new Error( `Error in updateBarrel:\n\t${ error }` );
  }
}

async function main() {
  try {
    const { componentType } = await getComponenType();
    const { componentName } = await getComponentName();
    const { fileTypesToCreate } = await getFilesTypeToCreate();
    const barrelPath = path.join( PATH_COMPONENTS, componentType );
    const pathComponent = path.join( barrelPath, componentName );
    await fs.mkdir( pathComponent, { recursive: true } );
    const pathComponentFiles = getPathFiles( pathComponent, fileTypesToCreate, componentName );
    await createFiles( fileTypesToCreate, pathComponentFiles, componentName, componentType );
    await updateBarrel( { barrelPath, componentName } );

  } catch ( error ) {
    console.log( `\n❌ ${ error }` );
  }
}

void main()
