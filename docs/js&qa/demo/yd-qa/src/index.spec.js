// jest
import React from 'react'
import App from './index'
import { render, cleanup, fireEvent } from '@testing-library/react'

afterEach(cleanup)

describe('react-unit-test', function(){
    it('index 测试', function(){
        const { getByTestId } = render(<App />)
        const [ ul, nav ] = [getByTestId('js-ul'), getByTestId('js-h1')]
        expect(ul.children.length).toBe(2)
        expect(nav.textContent).toContain('react')
    })
})