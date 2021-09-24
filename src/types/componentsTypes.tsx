/* eslint-disable no-unused-vars */
import React from 'react'

export interface ITextInputProps{
        placeholder: string;
        value: string;
        onChange: (e:React.FormEvent<HTMLInputElement>) => void;
        type?: string;
        name?:string;
}

export interface ISpanContentEditable {
        contentEditable: boolean|string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
}

export interface IDeleteButtonProps{
        onDelete(id: string):Promise<void>
        id : string
        getList(): Promise<void>
}
