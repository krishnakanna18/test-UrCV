import React, { Component } from 'react';
import SkillsEditor from './SkillsEditor'
import MenuEditor from './MenuEditor'
import ContainerEditor from './ContainerEditor'
import '../../public/Editor.css'
class Editor extends Component {
    constructor(){
        super()
        this.state={owner:""}
    }

    setOwner=()=>{
        if(this.props.type==='skills'){
            return 'SKILLS'
        }
        else if(this.props.type==='container')
        {
            return 'CONTAINER'
        }
        else if(this.props.type==='menu'){
            return 'MENU'
        }

    }


    displayEditor=()=>{
        if(this.props.type==='skills'){
            return(
                <SkillsEditor component={this.props.component} 
                              index={this.props.index} 
                              removeSkill={this.props.delete}
                              moveSkill={this.props.move}
                >
                    
                </SkillsEditor>
            )
        }

        else if(this.props.type==='container')
        {
                return(
                    <ContainerEditor>
                        
                    </ContainerEditor>
                )
                }
        else if(this.props.type==='menu'){
                    return(
                        <MenuEditor>

                        </MenuEditor>
                    )
        }

    }

    render() { 
        let owner=this.setOwner()
        return ( 
            <React.Fragment>
                <div className="d-flex flex-column container-fluid header">
                    <div className="mt-5  row justify-content-between" style={{}}>
                        <div className="offset-1 monospace font-weight-bold">
                            {owner}
                        </div>
                        <div className="font-weight-bold">
                        <button type="button" className="close" aria-label="Close"  onClick={()=>this.props.disableEditor()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    </div>
                    <div className="mt-5 pt-2">
                         {this.displayEditor()}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Editor;