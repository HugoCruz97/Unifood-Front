import ReactLoading from 'react-loading'

export function LoadingComponent() {
  return (
    <div className="flex justify-center m-96">
      <ReactLoading type="spin" color="#881337" delay={10000} />
    </div>
  )
}