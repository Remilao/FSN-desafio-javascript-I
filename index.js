// Base a ser utilizada
const alunosDaEscola=[{nome:"Henrique",notas:[],cursos:[],faltas:5},{nome:"Edson",notas:[],cursos:[],faltas:2},{nome:"Bruno",notas:[10,9.8,9.6],cursos:[],faltas:0},{nome:"Guilherme",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"Full Stack",dataMatricula:new Date}],faltas:0},{nome:"Carlos",notas:[],cursos:[],faltas:0},{nome:"Lucca",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"UX",dataMatricula:new Date}],faltas:0}];


// implementação
function adicionarAluno(nome){
    let objetoAluno = {nome:nome,notas:[],cursos:[],faltas:0}
    alunosDaEscola.push(objetoAluno);
    for (let obj of alunosDaEscola){
        if (obj.nome == nome){
            console.log(`Cadastro de ${nome} feito com sucesso!`);
        }
    }
}

function listarAlunos(){
    alunosDaEscola.map(aluno => {
        console.log("Nome:",aluno.nome);
        console.log("Notas:",aluno.notas);
        console.log("Cursos:");
        for(let i = 0; i < aluno.cursos.length; i++){
            console.log("   | Nome do Curso:",aluno.cursos[i].nomeDoCurso);
            console.log("   | Data da Matrícula:",aluno.cursos[i].dataMatricula);
            console.log("    " + "-".repeat(45))
        }
        console.log("Faltas:",aluno.faltas);
        console.log("▬".repeat(50));
    });
}

function dadosBonitos(alunoFiltrado){
    console.log("Nome:",alunoFiltrado[0].nome);
    console.log("Notas:",alunoFiltrado[0].notas);
    console.log("Cursos:");
    for(let i = 0; i < alunoFiltrado[0].cursos.length; i++){
         console.log("   | Nome do Curso:",alunoFiltrado[0].cursos[i].nomeDoCurso);
         console.log("   | Data da Matrícula:",alunoFiltrado[0].cursos[i].dataMatricula);
         console.log("    " + "-".repeat(45))
    }
    console.log("Faltas:",alunoFiltrado[0].faltas);
    console.log("▬".repeat(50));
}

function buscarAluno(nome){
    let filtrado = alunosDaEscola.filter(aluno => aluno.nome == nome);
    if (typeof filtrado[0] == "undefined"){
        console.log(`Desculpe! Não encontramos nenhum ${nome} na lista.`);
        return false
    } else {
        console.log(`${nome} foi encontrado com sucesso!`);
        dadosBonitos(filtrado)
    }
    return filtrado;
}


function matricularAluno(alunoObjeto, curso){
    let existe = buscarAluno(alunoObjeto.nome)
    if (existe && typeof existe[0].cursos[0] != "undefined"){
        existe[0].cursos.push({nomeDoCurso:curso,dataMatricula:new Date})
        console.log(`${alunoObjeto.nome} foi registrado no curso: ${curso} com sucesso!`)
        dadosBonitos(existe)
    } if (existe && typeof existe[0].cursos[0] == "undefined"){
        existe[0].cursos = [{nomeDoCurso:curso,dataMatricula:new Date}]
        console.log(`${alunoObjeto.nome} foi registrado no curso: ${curso} com sucesso!`)
        dadosBonitos(existe)
    }
}


function aplicarFalta(alunoObjeto){
    let existe = buscarAluno(alunoObjeto.nome)
    if (existe && typeof existe[0].cursos[0] != "undefined"){
        existe[0].faltas++;
        console.log(`Uma falta foi adicionada ao aluno ${alunoObjeto.nome}.`);
        dadosBonitos(existe)
    } if (existe && typeof existe[0].cursos[0] == "undefined") {
        console.log(`Ops! Parece que o aluno ${alunoObjeto.nome} não está matriculado em nenhum curso, portanto uma falta não pode ser aplicada.`)
    }
}


function aplicarNota(alunoObjeto,nota){
    let existe = buscarAluno(alunoObjeto.nome)
    if (existe && typeof existe[0].cursos[0] == "undefined") {
        console.log(`Ops! Parece que o aluno ${alunoObjeto.nome} não está matriculado em nenhum curso, portanto uma nota não pode ser adicionada.`)
    } else{
        if (existe && typeof existe[0].notas != "undefined"){
        existe[0].notas.push(nota)
        console.log(`A nota foi adicionada com sucesso ao aluno ${alunoObjeto.nome}!`)
        dadosBonitos(existe)
        } if (existe && typeof existe[0].notas == "undefined"){
        existe[0].notas = [nota]
        console.log(`A nota foi adicionada com sucesso ao aluno ${alunoObjeto.nome}!`)
        dadosBonitos(existe)
        }
    }
}


function aprovarAluno(alunoObjeto){
    let existe = buscarAluno(alunoObjeto.nome);
    if (typeof existe[0].faltas == "undefined" || typeof existe[0].cursos[0] == "undefined"){
        console.log(`O aluno ${existe[0].nome} não tem notas e/ou não está matriculado em um curso, portanto não pode ser aprovado.`)
    } else{
        if (existe[0].faltas > 3){
            console.log(`Infelizmente o aluno ${existe[0].nome} possui ${existe[0].faltas} faltas registradas, esse número ultrapassa o limite de 3 faltas do curso, logo o aluno não pode ser aprovado.`)
        } else{
            let soma = existe[0].notas.reduce((acum,atual) => acum + atual)
            let media = (soma / existe[0].notas.length).toFixed(1)
            console.log(media >= 7? `O aluno cumpre os requisitos para ser aprovado com uma média de ${(media)}!`:`A média ${media} está abaixo do mínimo, portanto o aluno não pode ser aprovado!`)
        }
    }
}