import {defineConfig,loadEnv,transformWithEsbuild} from 'vite';
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'REACT_APP_');
 return {
plugins:[{
    name:'legacy-jsx-source', enforce:'pre',
    async transform(code,id){
      if(/\/src\/.*\.js$/.test(id))
        return transformWithEsbuild(code,id,{loader:'jsx',jsx:'automatic'});
    },
  }],
 base:'/',
 build:{outDir:'build'},
 define:{'process.env.REACT_APP_API_URL':JSON.stringify(env.REACT_APP_API_URL||'')},
server:{proxy:{'/api':'http://127.0.0.1:3001'}},
 };
});
